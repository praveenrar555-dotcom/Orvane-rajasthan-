import React from 'react';

interface TopBarProps {
  onOpenConcierge: () => void;
  onRequestAccess: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenConcierge, onRequestAccess }) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#030611]/85 border-b border-amber-400/15 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Zone 1: Single text element wordmark in Cinzel display face */}
        <a
          href="#"
          className="text-lg sm:text-xl font-cinzel font-bold tracking-widest text-amber-200 hover:text-amber-100 transition-colors whitespace-nowrap"
        >
          ORVANE RAJASTHAN
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-medium uppercase tracking-wider text-amber-100/70 font-mono-numbers">
          <a href="#forts" className="hover:text-amber-200 hover:underline underline-offset-8 transition-colors whitespace-nowrap">
            Citadels
          </a>
          <a href="#folk-arts" className="hover:text-amber-200 hover:underline underline-offset-8 transition-colors whitespace-nowrap">
            Folk Arts
          </a>
          <a href="#crafts" className="hover:text-amber-200 hover:underline underline-offset-8 transition-colors whitespace-nowrap">
            Living Crafts
          </a>
          <a href="#cuisine" className="hover:text-amber-200 hover:underline underline-offset-8 transition-colors whitespace-nowrap">
            Royal Rasoi
          </a>
          <a href="#sound-studio" className="hover:text-amber-200 hover:underline underline-offset-8 transition-colors whitespace-nowrap">
            Sound Chamber
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenConcierge}
            className="px-3.5 py-1.5 text-xs font-cinzel font-semibold text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            AI Concierge
          </button>
          <button
            onClick={onRequestAccess}
            className="px-4 py-1.5 text-xs font-cinzel font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shadow-[0_0_12px_rgba(212,175,55,0.3)] cursor-pointer"
          >
            Royal Access
          </button>
        </div>
      </div>
    </header>
  );
};
