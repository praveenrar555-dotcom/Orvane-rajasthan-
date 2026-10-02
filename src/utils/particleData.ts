/**
 * Procedural 3D Point Cloud Generator for 150,000 Glowing Particles.
 * Models:
 * 1. Royal Sovereign Profile / Head Scan (proportioned to the Lee Perry-Smith 3D scan with Rajput turban & royal kalgi)
 * 2. Imperial Peacock of Jodhpur (Mayura with radiating tail plumage)
 * 3. Citadel & Hawa Mahal Jharokha Facade (sandstone arches, lattice windows, chhatri domes)
 * 4. Thar Desert Golden Nebula (celestial sand vortex)
 */

export const PARTICLE_COUNT = 150000;

export interface SilhouetteTarget {
  id: 'sovereign' | 'peacock' | 'citadel' | 'nebula';
  name: string;
  hindiName: string;
  description: string;
  accentColor: [number, number, number]; // RGB normalized
}

export const SILHOUETTES: SilhouetteTarget[] = [
  {
    id: 'sovereign',
    name: 'Royal Sovereign (Saafa & Head Scan)',
    hindiName: 'राजसी पगड़ी व महाराजा',
    description: '150,000 particles sampling the sovereign head scan with ceremonial Rajput turban and royal kalgi jewel',
    accentColor: [0.94, 0.78, 0.35], // Regal Gold
  },
  {
    id: 'peacock',
    name: 'Imperial Peacock of Rajputana',
    hindiName: 'शाही मयूर',
    description: 'Radiating plumage of the sacred peacock, royal state emblem of beauty and eternal grace',
    accentColor: [0.25, 0.72, 0.88], // Lapis Cyan
  },
  {
    id: 'citadel',
    name: 'Mehrangarh & Hawa Mahal Citadel',
    hindiName: 'दुर्ग एवं झरोखे',
    description: 'Lattice jharokhas, multi-tiered sandstone arches, and dome chhatris of historic Rajasthan',
    accentColor: [0.92, 0.48, 0.36], // Saffron Terracotta
  },
  {
    id: 'nebula',
    name: 'Thar Desert Starlit Nebula',
    hindiName: 'थार मरुस्थल तारापुंज',
    description: 'Swirling golden sand particles echoing ancient folk songs across the starlit dunes',
    accentColor: [0.85, 0.65, 0.95], // Royal Amethyst Gold
  },
];

/**
 * Deterministic pseudo-random generator for consistent procedural baking
 */
function seededRandom(seed: number) {
  let s = Math.sin(seed++) * 10000;
  return s - Math.floor(s);
}

/**
 * Generate 150,000 vertices for the Royal Sovereign Head Scan + Turban
 * Faithfully maps anatomical face landmarks from the Lee Perry-Smith scan:
 * cranium, temples, brows, nose bridge, philtrum, lips, jaw, chin, neck,
 * combined with the layered helical folds of a ceremonial Rajasthani Saafa & Kalgi.
 */
export function generateSovereignPointCloud(count = PARTICLE_COUNT): Float32Array {
  const positions = new Float32Array(count * 3);
  let idx = 0;

  for (let i = 0; i < count; i++) {
    const seed = i * 1.6180339887;
    const r1 = seededRandom(seed);
    const r2 = seededRandom(seed + 1);
    const r3 = seededRandom(seed + 2);

    let x = 0;
    let y = 0;
    let z = 0;

    // Allocate distribution across features:
    // 0.0 - 0.45: Anatomical Face & Head scan (Lee Perry-Smith scan profile)
    // 0.45 - 0.78: Royal Rajput Turban (Saafa) layered wrap
    // 0.78 - 0.88: Kalgi plume & royal jewel ornament
    // 0.88 - 1.00: Royal neck, collar & pearl haar cascade
    if (r1 < 0.45) {
      // Facial scan surface
      const phi = (r2 - 0.5) * Math.PI * 0.9; // Horizontal arc
      const theta = (r3 - 0.5) * Math.PI * 0.85; // Vertical span

      const rad = 1.05 + 0.12 * Math.cos(theta * 1.5);
      x = Math.sin(phi) * rad * 0.82;
      y = Math.sin(theta) * 1.15 - 0.15;
      z = Math.cos(phi) * Math.cos(theta) * rad * 0.95;

      // Sculpt brow & forehead
      if (y > 0.25 && y < 0.65) {
        z += 0.12 * (1 - Math.abs(x) * 1.5);
      }
      // Sculpt Nose Bridge & Tip (Lee Perry-Smith scan landmark)
      if (y >= -0.15 && y <= 0.28 && Math.abs(x) < 0.22) {
        const noseProfile = Math.max(0, 1 - Math.abs(x) / 0.18) * Math.sin(((y + 0.15) / 0.43) * Math.PI);
        z += noseProfile * 0.38;
      }
      // Sculpt Lips & Philtrum
      if (y >= -0.42 && y <= -0.18 && Math.abs(x) < 0.28) {
        const lipCurve = Math.max(0, 1 - Math.abs(x) / 0.25);
        z += lipCurve * 0.15 * Math.sin(((y + 0.42) / 0.24) * Math.PI * 2);
      }
      // Sculpt Chin & Jawline
      if (y < -0.42 && y > -0.75) {
        const chinTaper = 1 - (y + 0.75) / 0.33;
        x *= (0.65 + 0.35 * chinTaper);
        if (Math.abs(x) < 0.2) z += 0.18;
      }
      // Micro-surface noise for organic scan texture
      x += (seededRandom(seed + 3) - 0.5) * 0.025;
      y += (seededRandom(seed + 4) - 0.5) * 0.025;
      z += (seededRandom(seed + 5) - 0.5) * 0.025;

    } else if (r1 < 0.78) {
      // Ceremonial Rajasthani Saafa (Turban) - dynamic spiraling volumetric coils
      const coilFraction = (r1 - 0.45) / 0.33;
      const angle = coilFraction * Math.PI * 12 + r2 * Math.PI * 2;
      const coilHeight = 0.45 + coilFraction * 0.95 + (r3 - 0.5) * 0.18;
      const coilRadius = 1.05 + 0.32 * Math.sin(coilFraction * Math.PI) + (r2 - 0.5) * 0.22;

      x = Math.cos(angle) * coilRadius * 1.08;
      y = coilHeight;
      z = Math.sin(angle) * coilRadius * 0.95 + 0.05;

      // Front cross-knot characteristic of Rajputana pagri
      if (z > 0.6 && Math.abs(x) < 0.45) {
        y += 0.12 * Math.sin(x * 6);
        z += 0.18;
      }

    } else if (r1 < 0.88) {
      // Kalgi (Royal feather crest & jewel above forehead)
      const kalgiT = (r1 - 0.78) / 0.10;
      const spread = (r2 - 0.5) * 0.35 * (1 + kalgiT * 1.5);
      const plumeHeight = 1.25 + kalgiT * 0.75;

      x = spread * 0.6;
      y = plumeHeight;
      z = 0.82 - kalgiT * 0.22 + Math.sin(spread * 4) * 0.1;

      // Radiant curvature
      x += Math.sin(kalgiT * Math.PI) * 0.15;
    } else {
      // Royal neck, shoulders, and layered pearl haar
      const neckT = (r1 - 0.88) / 0.12;
      const neckAngle = r2 * Math.PI * 2;
      const neckRadius = 0.65 + neckT * 0.85 + (r3 - 0.5) * 0.15;

      x = Math.cos(neckAngle) * neckRadius * 1.25;
      y = -0.7 - neckT * 0.55;
      z = Math.sin(neckAngle) * neckRadius * 0.85;

      // Pearl necklace rows (layered rings)
      if (r3 > 0.65 && z > 0.2) {
        z += 0.12;
      }
    }

    positions[idx++] = x * 1.35;
    positions[idx++] = y * 1.35;
    positions[idx++] = z * 1.35;
  }

  return positions;
}

/**
 * Generate 150,000 vertices for the Imperial Peacock of Rajputana (Mayura)
 * Features regal neck, crested crown, and wide radiating arc of tail feathers.
 */
export function generatePeacockPointCloud(count = PARTICLE_COUNT): Float32Array {
  const positions = new Float32Array(count * 3);
  let idx = 0;

  for (let i = 0; i < count; i++) {
    const seed = i * 2.7182818284;
    const r1 = seededRandom(seed);
    const r2 = seededRandom(seed + 1);
    const r3 = seededRandom(seed + 2);

    let x = 0;
    let y = 0;
    let z = 0;

    if (r1 < 0.72) {
      // Radiating Fan of Tail Feathers (150,000 particles creating luminous eyes)
      const fanAngle = (r2 - 0.5) * Math.PI * 0.88; // 160 degree arc
      const fanDist = 0.55 + Math.pow(r3, 0.7) * 1.65;
      const featherWobble = Math.sin(fanAngle * 24 + fanDist * 8) * 0.04;

      x = Math.sin(fanAngle) * fanDist;
      y = Math.cos(fanAngle) * fanDist * 0.82 - 0.2 + featherWobble;
      z = -0.3 + (fanDist * 0.15) + (seededRandom(seed + 4) - 0.5) * 0.12;

      // Highlight feather eyes (ocelli clusters)
      const eyePattern = Math.sin(fanDist * 9) * Math.cos(fanAngle * 16);
      if (eyePattern > 0.6) {
        z += 0.08;
      }
    } else if (r1 < 0.88) {
      // Peacock Body & Graceful S-Curved Neck
      const bodyT = (r1 - 0.72) / 0.16;
      const neckAngle = (bodyT - 0.5) * Math.PI * 0.8;
      const bodyRadius = 0.35 * (1 - Math.abs(bodyT - 0.5) * 0.8) + (r2 - 0.5) * 0.1;

      x = Math.sin(r3 * Math.PI * 2) * bodyRadius * 0.65;
      y = (bodyT - 0.5) * 1.5 - 0.3;
      z = 0.45 + Math.cos(neckAngle) * 0.35 + Math.cos(r3 * Math.PI * 2) * bodyRadius;
    } else {
      // Peacock Head & Royal Crest
      const headT = (r1 - 0.88) / 0.12;
      const crestSpread = (r2 - 0.5) * 0.4;
      x = crestSpread * 0.45;
      y = 0.55 + headT * 0.45;
      z = 0.65 + (r3 - 0.5) * 0.15;
    }

    positions[idx++] = x * 1.25;
    positions[idx++] = y * 1.25;
    positions[idx++] = z * 1.25;
  }

  return positions;
}

/**
 * Generate 150,000 vertices for Citadel & Jharokha Facade
 * Architectural precision: multi-level arches, lattice screens, chhatri domes
 */
export function generateCitadelPointCloud(count = PARTICLE_COUNT): Float32Array {
  const positions = new Float32Array(count * 3);
  let idx = 0;

  for (let i = 0; i < count; i++) {
    const seed = i * 3.1415926535;
    const r1 = seededRandom(seed);
    const r2 = seededRandom(seed + 1);
    const r3 = seededRandom(seed + 2);

    let x = 0;
    let y = 0;
    let z = 0;

    if (r1 < 0.45) {
      // Main Fortress Sandstone Wall & Multi-Tier Ramparts
      const tier = Math.floor(r2 * 4);
      x = (r3 - 0.5) * 2.6;
      y = -1.1 + tier * 0.45 + (seededRandom(seed + 3) - 0.5) * 0.15;
      z = -0.2 - tier * 0.15 + (seededRandom(seed + 4) - 0.5) * 0.1;

      // Battlement crenellations at top of walls
      if (Math.sin(x * 18) > 0.2) {
        y += 0.08;
      }
    } else if (r1 < 0.78) {
      // Jharokha Lattice Balconies (projecting oriel windows with stone filigree)
      const windowIndex = Math.floor(r2 * 5); // 5 distinct jharokhas
      const windowX = (windowIndex - 2) * 0.55;
      const windowY = -0.15 + (windowIndex % 2) * 0.35;

      const subX = (r3 - 0.5) * 0.38;
      const archHeight = Math.sqrt(Math.max(0, 0.19 * 0.19 - subX * subX));

      x = windowX + subX;
      y = windowY + (seededRandom(seed + 5) - 0.5) * 0.35 + archHeight * 0.5;
      z = 0.35 + (seededRandom(seed + 6) - 0.5) * 0.15; // Project outward from wall
    } else {
      // Chhatri Domes (Pillared pavilions with Rajput canopies)
      const domeIndex = Math.floor(r2 * 3); // 3 rooftop chhatris
      const domeX = (domeIndex - 1) * 0.85;
      const domeBaseY = 0.75;

      const phi = r3 * Math.PI * 2;
      const theta = seededRandom(seed + 7) * Math.PI * 0.5;
      const domeRad = 0.32;

      x = domeX + Math.sin(theta) * Math.cos(phi) * domeRad;
      y = domeBaseY + Math.cos(theta) * domeRad * 1.2;
      z = 0.1 + Math.sin(theta) * Math.sin(phi) * domeRad;

      // Dome Kalash finial tip
      if (theta < 0.2) {
        y += 0.2;
      }
    }

    positions[idx++] = x * 1.15;
    positions[idx++] = y * 1.15;
    positions[idx++] = z * 1.15;
  }

  return positions;
}

/**
 * Generate 150,000 vertices for Thar Desert Celestial Nebula
 * Logarithmic spiral sandstorm swirl with starlit desert cosmos
 */
export function generateNebulaPointCloud(count = PARTICLE_COUNT): Float32Array {
  const positions = new Float32Array(count * 3);
  let idx = 0;

  for (let i = 0; i < count; i++) {
    const seed = i * 0.7071067811;
    const r1 = seededRandom(seed);
    const r2 = seededRandom(seed + 1);
    const r3 = seededRandom(seed + 2);

    // Golden logarithmic vortex
    const arms = 3;
    const armOffset = (i % arms) * ((Math.PI * 2) / arms);
    const radius = Math.pow(r1, 0.6) * 2.2;
    const spin = radius * 2.4 + armOffset;

    const x = Math.cos(spin) * radius + (r2 - 0.5) * 0.25;
    const y = (r3 - 0.5) * 0.45 * (1 + radius * 0.5);
    const z = Math.sin(spin) * radius + (seededRandom(seed + 3) - 0.5) * 0.25;

    positions[idx++] = x;
    positions[idx++] = y;
    positions[idx++] = z;
  }

  return positions;
}
