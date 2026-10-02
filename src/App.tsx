/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TopBar } from './components/Navigation/TopBar';
import { WebGLParticleCanvas } from './components/ParticleHero/WebGLParticleCanvas';
import { MeasurementGrid } from './components/ParticleHero/MeasurementGrid';
import { HeroOverlay } from './components/ParticleHero/HeroOverlay';
import { ImperialCitadels } from './components/Sections/ImperialCitadels';
import { FolkArts } from './components/Sections/FolkArts';
import { RoyalCrafts } from './components/Sections/RoyalCrafts';
import { RoyalCuisine } from './components/Sections/RoyalCuisine';
import { FolkSoundStudio } from './components/FolkSoundStudio/FolkSoundStudio';
import { RoyalConciergeModal } from './components/RoyalConcierge/RoyalConciergeModal';
import { RequestAccessModal } from './components/RequestAccess/RequestAccessModal';
import { Footer } from './components/Navigation/Footer';

export default function App() {
  const [currentSilhouette, setCurrentSilhouette] = useState<'sovereign' | 'peacock' | 'citadel' | 'nebula'>('sovereign');
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#030611] text-[#E8DCC4] flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Strict 3-Zone Top Navigation Bar */}
      <TopBar
        onOpenConcierge={() => setIsConciergeOpen(true)}
        onRequestAccess={() => setIsAccessModalOpen(true)}
      />

      {/* Full-Screen 3D Particle Hero Section */}
      <section className="relative w-full min-h-[92vh] md:min-h-screen flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#030611] via-[#050C22] to-[#030611]">
        {/* Raw WebGL2 Canvas: 150,000 Glowing Particles with Cursor Physics */}
        <div className="absolute inset-0 z-0">
          <WebGLParticleCanvas
            currentSilhouetteId={currentSilhouette}
          />
        </div>

        {/* Reticle grid & measurement background markings */}
        <div className="absolute inset-0 pointer-events-none reticle-grid opacity-40 z-[5]" />

        {/* Delicate Architectural Measurement Grid & Coordinates */}
        <MeasurementGrid />

        {/* DOM Text, Headline, Rotating Blur Statement, Counting Figures & Controls */}
        <HeroOverlay
          currentSilhouetteId={currentSilhouette}
          onSelectSilhouette={setCurrentSilhouette}
          onRequestAccess={() => setIsAccessModalOpen(true)}
          onOpenAiConcierge={() => setIsConciergeOpen(true)}
        />
      </section>

      {/* Main Content Sections */}
      <main className="relative z-20 bg-[#030611]">
        {/* 01. Imperial Citadels of Rajputana */}
        <ImperialCitadels />

        {/* 02. Folk Arts & Royal Dances */}
        <FolkArts />

        {/* 03. Living Arts & Royal Guilds */}
        <RoyalCrafts />

        {/* 04. Flavors of Rajputana (Royal Rasoi) */}
        <RoyalCuisine />

        {/* 05. The Desert Sound Chamber (Interactive Raag Mand Swaras) */}
        <FolkSoundStudio />
      </main>

      {/* Modals & Dialogues */}
      <RoyalConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />

      <RequestAccessModal
        isOpen={isAccessModalOpen}
        onClose={() => setIsAccessModalOpen(false)}
      />

      {/* Editorial Footer with Required CC BY 3.0 Head Scan Credit */}
      <Footer />
    </div>
  );
}
