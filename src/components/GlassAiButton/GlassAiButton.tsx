import React, { useState, useRef } from 'react';
import { folkAudio } from '../../utils/audio';

interface GlassAiButtonProps {
  onActivate?: () => void;
  label?: string;
  sublabel?: string;
}

interface BurstParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

export const GlassAiButton: React.FC<GlassAiButtonProps> = ({
  onActivate,
  label = "ORVANE SOL",
  sublabel = "ROYAL HERITAGE AI",
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);
  const [particles, setParticles] = useState<BurstParticle[]>([]);

  // 3D tilt on mouse hover
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 14, y: -y * 14 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Launch particle burst on activation
  const triggerBurst = () => {
    folkAudio.playBurstChord();

    // Spawn 36 sparkling particles
    const newParticles: BurstParticle[] = [];
    const colors = ['#F59E0B', '#E07A5F', '#38BDF8', '#FDE68A', '#FFFFFF'];

    for (let i = 0; i < 36; i++) {
      const angle = (i / 36) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const speed = 2.5 + Math.random() * 4.5;
      newParticles.push({
        id: Date.now() + i,
        x: 0,
        y: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 4,
        color: colors[i % colors.length],
      });
    }

    setParticles(newParticles);

    // Animate & cleanup particles
    setTimeout(() => {
      setParticles([]);
    }, 1200);

    if (onActivate) {
      onActivate();
    }
  };

  const handleClick = () => {
    setIsPressed(true);
    triggerBurst();
    setTimeout(() => setIsPressed(false), 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="relative inline-flex items-center justify-center p-1">
      {/* Particle Burst Overlay */}
      {particles.length > 0 && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50 overflow-visible">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full animate-ping pointer-events-none"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                boxShadow: `0 0 10px ${p.color}`,
                transform: `translate(${p.vx * 22}px, ${p.vy * 22}px)`,
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* Glass Button Frame */}
      <button
        ref={buttonRef}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-ai-container group relative flex items-center gap-3.5 px-5 py-2.5 sm:px-6 sm:py-3 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030611]"
        style={{
          transform: `perspective(600px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(${isPressed ? 0.96 : 1})`,
        }}
        aria-label={`${label} - ${sublabel}`}
      >
        {/* Deep-blue galaxy orb with spinning stellar swirl */}
        <div className="relative w-8 h-8 rounded-full glass-galaxy-orb flex items-center justify-center overflow-hidden shrink-0">
          {/* Subtle cosmic cloud rotation */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/20 via-sky-500/30 to-purple-600/40 animate-spin duration-10000" />
          
          {/* Traced brain & royal lotus icon */}
          <svg
            className="w-4 h-4 text-amber-100 relative z-10 drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Traced Brain & Lotus Filaments */}
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
        </div>

        {/* Luminous Typography */}
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-sm font-cinzel font-bold text-amber-100 tracking-wider group-hover:text-amber-200 transition-colors drop-shadow-[0_0_8px_rgba(244,208,104,0.4)] whitespace-nowrap">
              {label}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399] animate-pulse" />
          </div>
          <span className="text-[10px] tracking-widest text-amber-200/70 font-mono-numbers uppercase whitespace-nowrap">
            {sublabel}
          </span>
        </div>

        {/* Animated arrow affordance */}
        <div className="ml-1 text-amber-300/80 group-hover:text-amber-100 group-hover:translate-x-1 transition-all">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    </div>
  );
};
