import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  PARTICLE_COUNT,
  generateSovereignPointCloud,
  generatePeacockPointCloud,
  generateCitadelPointCloud,
  generateNebulaPointCloud,
  SILHOUETTES,
} from '../../utils/particleData';
import { folkAudio } from '../../utils/audio';

interface WebGLParticleCanvasProps {
  currentSilhouetteId: 'sovereign' | 'peacock' | 'citadel' | 'nebula';
  isInteracting?: boolean;
  onParticleInteraction?: () => void;
}

export const WebGLParticleCanvas: React.FC<WebGLParticleCanvasProps> = ({
  currentSilhouetteId,
  onParticleInteraction,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const animFrameId = useRef<number | null>(null);

  // Cached point cloud buffers
  const pointClouds = useRef<{ [key: string]: Float32Array }>({});
  const activeBuffers = useRef<{ [key: string]: WebGLBuffer | null }>({});

  const [hasWebGL2, setHasWebGL2] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Interaction & Physics state
  const mouseState = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    vx: 0,
    vy: 0,
    isHovered: false,
    repulsionStrength: 0.0,
  });

  const rotationState = useRef({
    rx: 0.08,
    ry: 0.0,
    targetRx: 0.08,
    targetRy: 0.0,
    autoRotateSpeed: 0.003,
  });

  // Morphing state
  const morphState = useRef({
    progress: 1.0,
    fromId: 'sovereign',
    toId: 'sovereign',
    targetColor: [0.94, 0.78, 0.35],
    currentColor: [0.94, 0.78, 0.35],
  });

  // Check prefers-reduced-motion
  const prefersReducedMotion = useRef<boolean>(false);

  // Shaders source code
  const vertexShaderSource = `#version 300 es
    precision highp float;

    in vec3 a_position_from;
    in vec3 a_position_to;

    uniform float u_morph_progress;
    uniform vec2 u_mouse;
    uniform float u_mouse_speed;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform float u_repulsion_strength;
    uniform mat4 u_mvp;
    uniform float u_point_scale;

    out vec3 v_color;
    out float v_dist_factor;
    out float v_depth;

    // 3D rotation matrix helpers
    mat3 rotateY(float angle) {
      float c = cos(angle);
      float s = sin(angle);
      return mat3(
        c, 0.0, -s,
        0.0, 1.0, 0.0,
        s, 0.0, c
      );
    }

    mat3 rotateX(float angle) {
      float c = cos(angle);
      float s = sin(angle);
      return mat3(
        1.0, 0.0, 0.0,
        0.0, c, s,
        0.0, -s, c
      );
    }

    void main() {
      // Morph between two 3D silhouettes smoothly with cubic ease
      float t = smoothstep(0.0, 1.0, u_morph_progress);
      vec3 basePos = mix(a_position_from, a_position_to, t);

      // Subtle breath oscillation characteristic of Rajasthani desert air
      float breath = sin(u_time * 1.2 + basePos.y * 3.0) * 0.018;
      basePos += normalize(basePos + vec3(0.001)) * breath;

      // Project into view space
      vec4 viewPos = u_mvp * vec4(basePos, 1.0);
      vec2 ndcPos = viewPos.xy / viewPos.w;

      // Distance to cursor in screen space
      float distToMouse = distance(ndcPos, u_mouse);
      float repulsionRadius = 0.55;

      vec3 displacedPos = basePos;
      float displacementAmt = 0.0;

      if (distToMouse < repulsionRadius && u_repulsion_strength > 0.01) {
        float force = smoothstep(repulsionRadius, 0.0, distToMouse);
        vec2 dir = normalize(ndcPos - u_mouse + vec2(0.0001));

        // Swirling vortex scatter vector
        vec3 repulseVector = vec3(dir.x, dir.y, -sin(distToMouse * 6.28) * 0.4);
        displacementAmt = force * u_repulsion_strength * (1.0 + u_mouse_speed * 1.5);
        displacedPos += repulseVector * displacementAmt * 0.95;
      }

      // Final position transformation
      vec4 finalPos = u_mvp * vec4(displacedPos, 1.0);
      gl_Position = finalPos;

      // Depth attenuation for particle size
      float depth = clamp((finalPos.z + 4.0) * 0.25, 0.2, 2.5);
      v_depth = depth;

      // Size calculation
      gl_PointSize = clamp(u_point_scale * (2.8 / depth) * (1.0 + displacementAmt * 0.8), 1.2, 7.5);

      v_dist_factor = displacementAmt;
    }
  `;

  const fragmentShaderSource = `#version 300 es
    precision highp float;

    in float v_dist_factor;
    in float v_depth;

    uniform vec3 u_base_color;
    uniform float u_time;

    out vec4 fragColor;

    void main() {
      // Calculate circular soft disc with glowing core
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);

      if (dist > 0.5) {
        discard;
      }

      // Double-layer specular glow: intense gold/jewel center + atmospheric haze
      float innerCore = smoothstep(0.2, 0.0, dist);
      float outerGlow = smoothstep(0.5, 0.0, dist);

      // Dynamic color grading: Gold base + Lapis Lazuli highlight + Saffron ember when scattered
      vec3 coreColor = vec3(1.0, 0.98, 0.92);
      vec3 ambientColor = u_base_color;
      vec3 scatterColor = vec3(1.0, 0.45, 0.2); // Saffron spark when cursor scatters

      vec3 finalColor = mix(ambientColor, scatterColor, clamp(v_dist_factor * 1.8, 0.0, 1.0));
      finalColor = mix(finalColor, coreColor, innerCore * 0.85);

      // Depth-based subtle fading
      float alpha = (outerGlow * 0.75 + innerCore * 0.45) * clamp(1.2 - v_depth * 0.3, 0.25, 1.0);

      fragColor = vec4(finalColor, alpha);
    }
  `;

  // Initialize WebGL2 context and buffers
  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      setHasWebGL2(false);
      return;
    }

    glRef.current = gl;

    // Compile shaders
    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, vertexShaderSource);
    gl.compileShader(vs);
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      console.error('VS Error:', gl.getShaderInfoLog(vs));
      return;
    }

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, fragmentShaderSource);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.error('FS Error:', gl.getShaderInfoLog(fs));
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Link Error:', gl.getProgramInfoLog(program));
      return;
    }

    programRef.current = program;
    gl.useProgram(program);

    // Generate Point Clouds
    pointClouds.current['sovereign'] = generateSovereignPointCloud(PARTICLE_COUNT);
    pointClouds.current['peacock'] = generatePeacockPointCloud(PARTICLE_COUNT);
    pointClouds.current['citadel'] = generateCitadelPointCloud(PARTICLE_COUNT);
    pointClouds.current['nebula'] = generateNebulaPointCloud(PARTICLE_COUNT);

    // Create GPU VBOs
    Object.keys(pointClouds.current).forEach((key) => {
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, pointClouds.current[key], gl.STATIC_DRAW);
      activeBuffers.current[key] = buf;
    });

    // Configure blending for royal luminescence
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE); // Additive luminous blending
    gl.disable(gl.DEPTH_TEST);

    // Initial resize
    handleResize();
  }, []);

  // Handle Resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const gl = glRef.current;
    if (!canvas || !gl) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
  }, []);

  // Silhouette transition trigger
  useEffect(() => {
    if (morphState.current.toId !== currentSilhouetteId) {
      morphState.current.fromId = morphState.current.toId;
      morphState.current.toId = currentSilhouetteId;
      morphState.current.progress = 0.0;

      const target = SILHOUETTES.find((s) => s.id === currentSilhouetteId);
      if (target) {
        morphState.current.targetColor = target.accentColor;
      }
    }
  }, [currentSilhouetteId]);

  // Animation render loop
  useEffect(() => {
    initWebGL();

    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
    const handleContextRestored = () => {
      initWebGL();
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);
    }

    window.addEventListener('resize', handleResize);

    let lastTime = performance.now();
    let noteTriggerCounter = 0;

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const gl = glRef.current;
      const program = programRef.current;

      if (!document.hidden && gl && program) {
        gl.clearColor(0.015, 0.03, 0.08, 0.0); // Transparent canvas on deep blue container
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Smooth mouse interpolation & spring return
        const m = mouseState.current;
        m.x += (m.targetX - m.x) * 0.14;
        m.y += (m.targetY - m.y) * 0.14;

        const currentSpeed = Math.sqrt(m.vx * m.vx + m.vy * m.vy);
        m.vx *= 0.9;
        m.vy *= 0.9;

        // Smoothly settle repulsion back to 0 when cursor exits or rests
        if (m.isHovered) {
          m.repulsionStrength = Math.min(1.0, m.repulsionStrength + dt * 4.0);
        } else {
          m.repulsionStrength = Math.max(0.0, m.repulsionStrength - dt * 2.5);
        }

        // Camera rotation damping
        const r = rotationState.current;
        if (!prefersReducedMotion.current) {
          r.targetRy += r.autoRotateSpeed;
        }
        r.rx += (r.targetRx - r.rx) * 0.08;
        r.ry += (r.targetRy - r.ry) * 0.08;

        // Morph progress interpolation
        const morph = morphState.current;
        if (morph.progress < 1.0) {
          morph.progress = Math.min(1.0, morph.progress + dt * 0.95);
        }

        // Color interpolation
        for (let c = 0; c < 3; c++) {
          morph.currentColor[c] += (morph.targetColor[c] - morph.currentColor[c]) * 0.06;
        }

        // Trigger subtle chime on active scattering
        if (m.isHovered && currentSpeed > 0.05) {
          noteTriggerCounter++;
          if (noteTriggerCounter % 32 === 0) {
            folkAudio.playNote((noteTriggerCounter / 32) % 7, 0.25);
            if (onParticleInteraction) onParticleInteraction();
          }
        }

        // Uniforms
        gl.useProgram(program);

        const uMorphProgress = gl.getUniformLocation(program, 'u_morph_progress');
        const uMouse = gl.getUniformLocation(program, 'u_mouse');
        const uMouseSpeed = gl.getUniformLocation(program, 'u_mouse_speed');
        const uTime = gl.getUniformLocation(program, 'u_time');
        const uRepulsionStrength = gl.getUniformLocation(program, 'u_repulsion_strength');
        const uBaseColor = gl.getUniformLocation(program, 'u_base_color');
        const uMvp = gl.getUniformLocation(program, 'u_mvp');
        const uPointScale = gl.getUniformLocation(program, 'u_point_scale');

        gl.uniform1f(uMorphProgress, morph.progress);
        gl.uniform2f(uMouse, m.x, m.y);
        gl.uniform1f(uMouseSpeed, currentSpeed);
        gl.uniform1f(uTime, time * 0.001);
        gl.uniform1f(uRepulsionStrength, m.repulsionStrength);
        gl.uniform3fv(uBaseColor, morph.currentColor);

        // Responsive point scale for high DPI
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        gl.uniform1f(uPointScale, dpr);

        // Compute 4x4 MVP Matrix
        const aspect = (canvas?.width || 1) / (canvas?.height || 1);
        const fov = 45 * (Math.PI / 180);
        const near = 0.1;
        const far = 100.0;
        const f = 1.0 / Math.tan(fov / 2);

        // Perspective projection
        const p0 = f / aspect;
        const p5 = f;
        const p10 = (far + near) / (near - far);
        const p11 = -1.0;
        const p14 = (2.0 * far * near) / (near - far);

        // Model view rotation
        const cosY = Math.cos(r.ry);
        const sinY = Math.sin(r.ry);
        const cosX = Math.cos(r.rx);
        const sinX = Math.sin(r.rx);

        // Camera distance (adapt on mobile vs desktop)
        const isMobile = window.innerWidth < 768;
        const camDist = isMobile ? 4.6 : 3.8;

        // Combined MVP matrix
        const mvp = new Float32Array([
          p0 * cosY,
          p5 * sinX * sinY,
          -cosX * sinY * p10,
          cosX * sinY,

          0,
          p5 * cosX,
          sinX * p10,
          -sinX,

          p0 * sinY,
          -p5 * sinX * cosY,
          cosX * cosY * p10,
          -cosX * cosY,

          0,
          0,
          p14 - camDist * p10,
          camDist,
        ]);

        gl.uniformMatrix4fv(uMvp, false, mvp);

        // Bind attributes
        const aPosFrom = gl.getAttribLocation(program, 'a_position_from');
        const aPosTo = gl.getAttribLocation(program, 'a_position_to');

        const bufFrom = activeBuffers.current[morph.fromId];
        const bufTo = activeBuffers.current[morph.toId];

        if (bufFrom && bufTo && aPosFrom !== -1 && aPosTo !== -1) {
          gl.bindBuffer(gl.ARRAY_BUFFER, bufFrom);
          gl.enableVertexAttribArray(aPosFrom);
          gl.vertexAttribPointer(aPosFrom, 3, gl.FLOAT, false, 0, 0);

          gl.bindBuffer(gl.ARRAY_BUFFER, bufTo);
          gl.enableVertexAttribArray(aPosTo);
          gl.vertexAttribPointer(aPosTo, 3, gl.FLOAT, false, 0, 0);

          // DRAW 150,000 GLOWING PARTICLES
          gl.drawArrays(gl.POINTS, 0, PARTICLE_COUNT);
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      }
    };
  }, [initWebGL, handleResize, onParticleInteraction]);

  // Pointer Interaction Handlers
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

    const m = mouseState.current;
    m.vx = x - m.targetX;
    m.vy = y - m.targetY;
    m.targetX = x;
    m.targetY = y;
    m.isHovered = true;

    // Subtle interactive camera tilt
    const r = rotationState.current;
    r.targetRy = x * 0.45;
    r.targetRx = 0.08 - y * 0.25;
  };

  const handlePointerLeave = () => {
    const m = mouseState.current;
    m.isHovered = false;
    const r = rotationState.current;
    r.targetRx = 0.08;
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {hasWebGL2 ? (
        <canvas
          ref={canvasRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
        />
      ) : (
        /* Accessible Fallback when WebGL2 is unsupported */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#050C1F] text-amber-100">
          <div className="w-24 h-24 mb-6 rounded-full border border-amber-400/30 flex items-center justify-center bg-amber-500/10">
            <svg className="w-12 h-12 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h2 className="text-2xl font-cinzel font-bold text-amber-200 mb-2">
            The Royal Sovereign Profile
          </h2>
          <p className="max-w-md text-sm text-stone-300 font-serif-cormorant leading-relaxed">
            150,000 glowing particles of the royal Rajasthani heritage head scan. Please enable WebGL2 in your browser settings to experience real-time 3D particle scattering and dimensional rotation.
          </p>
        </div>
      )}
    </div>
  );
};
