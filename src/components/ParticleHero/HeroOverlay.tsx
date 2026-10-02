import React, { useState } from 'react';
import { SILHOUETTES, SilhouetteTarget } from '../../utils/particleData';
import { PerLetterBlurStatement } from './PerLetterBlurStatement';
import { GlassAiButton } from '../GlassAiButton/GlassAiButton';
import { folkAudio } from '../../utils/audio';

interface HeroOverlayProps {
  currentSilhouetteId: 'sovereign' | 'peacock' | 'citadel' | 'nebula';
  onSelectSilhouette: (id: 'sovereign' | 'peacock' | 'citadel' | 'nebula') => void;
  onRequestAccess: () => void;
  onOpenAiConcierge: () => void;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({
  currentSilhouetteId,
  onSelectSilhouette,
  onRequestAccess,
  onOpenAiConcierge,
}) => {
  const [isAudioActive, setIsAudioActive] = useState<boolean>(!folkAudio.getMutedStatus());

  const handleAudioToggle = () => {
    const isNowPlaying = folkAudio.toggleMute();
    setIsAudioActive(isNowPlaying);
  };

  return (
    <div className="relative z-20 flex flex-col justify-between h-full min-h-[90vh] md:min-h-screen px-4 sm:px-8 py-6 md:py-10 max-w-7xl mx-auto pointer-events-none">
      {/* Top Section: Brand Kicker & Audio Ambience Switch */}
      <div className="flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-[0.25em] font-mono-numbers text-amber-300/80">
            ORVANE · RAJASTHAN
          </span>
          <span className="text-amber-500/40">·</span>
          <span className="text-xs text-amber-100/60 font-serif-cormorant italic hidden sm:inline">
            The Living Realm of Rajputana
          </span>
        </div>

        {/* Ambient Tanpura Drone Controller */}
        <button
          onClick={handleAudioToggle}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-amber-400/25 hover:border-amber-400/60 transition-all text-xs text-amber-200/90 backdrop-blur-md cursor-pointer focus-visible:ring-1 focus-visible:ring-amber-400"
          aria-label={isAudioActive ? "Mute Tanpura Folk Drone" : "Play Tanpura Folk Drone"}
        >
          <div className="flex items-center gap-0.5 h-3">
            {[4, 8, 12, 6].map((h, i) => (
              <span
                key={i}
                className={`w-0.5 rounded-full bg-amber-400 transition-all duration-300 ${
                  isAudioActive ? 'animate-pulse' : 'opacity-40'
                }`}
                style={{
                  height: isAudioActive ? `${h}px` : '3px',
                  animationDelay: `${i * 150}ms`,
                }}
              />
            ))}
          </div>
          <span className="font-mono-numbers text-[11px] uppercase tracking-wider">
            {isAudioActive ? "Tanpura Sound: On" : "Tanpura: Off"}
          </span>
        </button>
      </div>

      {/* Center Hero Core: Headline, Rotating Statement & Dynamic Silhouettes */}
      <div className="my-auto py-8 text-center flex flex-col items-center">
        {/* Editorial Royal Monogram */}
        <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-400/20 bg-amber-500/5 backdrop-blur-sm pointer-events-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          <span className="text-[11px] font-mono-numbers uppercase tracking-widest text-amber-300">
            150,000 Resonant 3D Particles · WebGL2 Native
          </span>
        </div>

        {/* Majestic Display Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-cinzel font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-500/80 max-w-4xl text-balance drop-shadow-[0_4px_24px_rgba(212,175,55,0.25)]">
          The Immortal Soul of Rajasthan
        </h1>

        <p className="mt-3 text-xs sm:text-sm uppercase tracking-[0.2em] font-cinzel text-amber-300/80">
          पधारो म्हारे देस · Land of Kings, Fortresses & Starlit Lore
        </p>

        {/* Rotating statement with per-letter optical blur */}
        <div className="mt-6 w-full">
          <PerLetterBlurStatement />
        </div>

        {/* Interactive Silhouette Selector (Switch 150k particles between 4 icons) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 pointer-events-auto max-w-2xl px-2">
          {SILHOUETTES.map((sil) => {
            const isActive = currentSilhouetteId === sil.id;
            return (
              <button
                key={sil.id}
                onClick={() => {
                  onSelectSilhouette(sil.id);
                  folkAudio.playNote(2, 0.4);
                }}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400/20 text-amber-200 border border-amber-400/70 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                    : 'bg-black/30 text-stone-400 hover:text-amber-200 border border-white/10 hover:border-amber-400/40'
                }`}
              >
                <span className="font-cinzel">{sil.name.split(' (')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Action Pair: Glass AI Button + Request Access with Animated Arrows */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 pointer-events-auto">
          {/* Authored Glass AI Button Component */}
          <GlassAiButton
            onActivate={onOpenAiConcierge}
            label="ORVANE SOL"
            sublabel="ROYAL CULTURAL AI"
          />

          {/* Request Access Button with Animated Arrows */}
          <button
            onClick={onRequestAccess}
            className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 text-stone-950 font-cinzel font-bold text-xs sm:text-sm tracking-wider shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <span>REQUEST AUDIENCE</span>
            {/* Animated Directional Arrows */}
            <div className="relative flex items-center overflow-hidden w-5 h-4">
              <span className="absolute transform transition-transform duration-300 group-hover:translate-x-5">
                →
              </span>
              <span className="absolute transform -translate-x-5 transition-transform duration-300 group-hover:translate-x-0">
                →
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Section: Three Counting Figures + Required Head Scan Credit */}
      <div className="pt-6 border-t border-amber-400/15 flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-auto">
        {/* Three Counting Figures with tabular numerals */}
        <div className="grid grid-cols-3 gap-6 sm:gap-12 text-left">
          <div>
            <div className="text-xl sm:text-2xl font-cinzel font-bold text-amber-200 font-mono-numbers">
              1,200+
            </div>
            <div className="text-[11px] uppercase tracking-wider text-amber-400/70 font-mono-numbers">
              Dynastic Years
            </div>
          </div>

          <div>
            <div className="text-xl sm:text-2xl font-cinzel font-bold text-amber-200 font-mono-numbers">
              32
            </div>
            <div className="text-[11px] uppercase tracking-wider text-amber-400/70 font-mono-numbers">
              Citadels & Forts
            </div>
          </div>

          <div>
            <div className="text-xl sm:text-2xl font-cinzel font-bold text-amber-200 font-mono-numbers">
              150K
            </div>
            <div className="text-[11px] uppercase tracking-wider text-amber-400/70 font-mono-numbers">
              Active Particles
            </div>
          </div>
        </div>

        {/* Required Attribution & License Credit */}
        <div className="text-right text-[11px] text-stone-400/80 font-mono-numbers max-w-xs sm:max-w-md">
          <span>3D head scan sampled from </span>
          <a
            href="https://creativecommons.org/licenses/by/3.0/"
            target="_blank"
            rel="noreferrer"
            className="text-amber-300/90 underline hover:text-amber-200"
          >
            Lee Perry-Smith (CC BY 3.0)
          </a>
          <span className="block mt-0.5 text-stone-500">Baked into 1.8 MB buffer · Raw WebGL2 & Vite</span>
        </div>
      </div>
    </div>
  );
};
