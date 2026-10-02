import React from 'react';

interface MeasurementGridProps {
  currentCoordinates?: {
    city: string;
    lat: string;
    lng: string;
    elevation: string;
  };
}

export const MeasurementGrid: React.FC<MeasurementGridProps> = ({
  currentCoordinates = {
    city: 'RAJPUTANA REALM',
    lat: '26.9124° N',
    lng: '75.7873° E',
    elevation: '431m MSL',
  },
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
      {/* Top Hairline & Corner Reticles */}
      <div className="flex items-start justify-between text-[11px] font-mono-numbers text-amber-300/60 uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 border-t border-l border-amber-400/80" />
          <span>GRID SEC. RAJ-01</span>
          <span className="text-amber-500/40">/</span>
          <span className="hidden sm:inline text-amber-200/80">{currentCoordinates.city}</span>
        </div>

        <div className="flex items-center gap-4 text-right">
          <span className="hidden md:inline text-amber-200/60">{currentCoordinates.lat} · {currentCoordinates.lng}</span>
          <span className="text-amber-500/40 hidden md:inline">/</span>
          <span>{currentCoordinates.elevation}</span>
          <span className="w-2.5 h-2.5 border-t border-r border-amber-400/80" />
        </div>
      </div>

      {/* Center Left & Right Measurement Calipers */}
      <div className="flex items-center justify-between my-auto w-full text-[10px] font-mono-numbers text-amber-300/40 select-none">
        <div className="hidden lg:flex flex-col gap-3 pl-1 border-l border-amber-400/20 py-8">
          <span>+90° ZENITH</span>
          <div className="w-3 h-px bg-amber-400/40" />
          <span>+45° AZIMUTH</span>
          <div className="w-5 h-px bg-amber-400/60" />
          <span className="text-amber-300/80 font-medium">00° EQUATOR</span>
          <div className="w-3 h-px bg-amber-400/40" />
          <span>-45° NADIR</span>
        </div>

        <div className="hidden lg:flex flex-col gap-3 pr-1 border-r border-amber-400/20 py-8 text-right">
          <span>150K PARTICLES</span>
          <div className="w-3 h-px bg-amber-400/40 ml-auto" />
          <span>60 FPS RAW GL2</span>
          <div className="w-5 h-px bg-amber-400/60 ml-auto" />
          <span className="text-amber-300/80 font-medium">1.8 MB BUFFER</span>
          <div className="w-3 h-px bg-amber-400/40 ml-auto" />
          <span>DPR 2.0 SCALED</span>
        </div>
      </div>

      {/* Bottom Hairline & Coordinate Ticks */}
      <div className="flex items-end justify-between text-[11px] font-mono-numbers text-amber-300/60 uppercase tracking-widest pt-4">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 border-b border-l border-amber-400/80" />
          <span>SCALE 1:1.35</span>
          <span className="text-amber-500/40">/</span>
          <span className="hidden sm:inline">ORIGIN: LEE PERRY-SMITH SCAN (CC BY 3.0)</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">RAJASTHAN HERITAGE COMMISSION</span>
          <span className="text-amber-500/40 hidden sm:inline">/</span>
          <span>EST. 568 CE</span>
          <span className="w-2.5 h-2.5 border-b border-r border-amber-400/80" />
        </div>
      </div>
    </div>
  );
};
