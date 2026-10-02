import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-amber-400/15 bg-[#02050E] text-stone-400 py-16 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Brand & Mission */}
        <div className="space-y-4">
          <a href="#" className="text-lg font-cinzel font-bold text-amber-200 tracking-wider">
            ORVANE RAJASTHAN
          </a>
          <p className="text-xs font-serif-cormorant text-stone-300 leading-relaxed">
            A digital sanctuary dedicated to the enduring architectural, musical, culinary, and spiritual heritage of Rajasthan.
          </p>
          <div className="text-[11px] font-mono-numbers text-amber-400/80">
            26.9124° N, 75.7873° E · RAJPUTANA REALM
          </div>
        </div>

        {/* Citadels & Regions */}
        <div>
          <span className="text-xs uppercase font-mono-numbers text-amber-300 tracking-wider block mb-3">
            Royal Bastions
          </span>
          <ul className="space-y-2 text-xs font-serif-cormorant text-stone-300">
            <li>Mehrangarh Citadel, Jodhpur</li>
            <li>Amber Palace & Hawa Mahal, Jaipur</li>
            <li>City Palace & Lake Pichola, Udaipur</li>
            <li>Sonar Qila & Sam Dunes, Jaisalmer</li>
            <li>Chittorgarh & Kumbhalgarh Walls</li>
          </ul>
        </div>

        {/* Living Guilds */}
        <div>
          <span className="text-xs uppercase font-mono-numbers text-amber-300 tracking-wider block mb-3">
            Artisanal Guilds
          </span>
          <ul className="space-y-2 text-xs font-serif-cormorant text-stone-300">
            <li>Jaipur Quartz Blue Pottery</li>
            <li>Kundan & Meenakari Royal Enameling</li>
            <li>Bandhani & Leheriya Silk Weaves</li>
            <li>Dabu & Bagru Hand Block Print</li>
            <li>Langa & Manganiyar Desert Troubadours</li>
          </ul>
        </div>

        {/* Attribution & Technology */}
        <div>
          <span className="text-xs uppercase font-mono-numbers text-amber-300 tracking-wider block mb-3">
            Scholarly Attribution
          </span>
          <p className="text-xs font-mono-numbers text-stone-400 leading-relaxed mb-3">
            3D head scan geometry is sampled from{' '}
            <a
              href="https://creativecommons.org/licenses/by/3.0/"
              target="_blank"
              rel="noreferrer"
              className="text-amber-300 underline hover:text-amber-200"
            >
              Lee Perry-Smith
            </a>{' '}
            under Creative Commons Attribution 3.0 Unported (CC BY 3.0).
          </p>
          <p className="text-[11px] font-mono-numbers text-stone-500">
            Built on raw WebGL2 & Vite with 150,000 GPU-instanced point vertices. Zero external telemetry libraries.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-numbers text-stone-500">
        <div>
          © {new Date().getFullYear()} Orvane Rajasthan Heritage Foundation. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <span>Padharo Mhare Desh</span>
          <span>·</span>
          <span>Preserving 1,200 Years of Royalty</span>
        </div>
      </div>
    </footer>
  );
};
