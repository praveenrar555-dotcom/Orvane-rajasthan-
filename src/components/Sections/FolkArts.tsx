import React, { useState } from 'react';
import ghoomarImg from '../../assets/images/rajasthan_ghoomar_folk_1790950053501.jpg';
import { folkAudio } from '../../utils/audio';

interface FolkPerformance {
  id: string;
  name: string;
  hindiName: string;
  origin: string;
  tempo: string;
  instruments: string[];
  description: string;
  culturalSignificance: string;
}

const PERFORMANCES: FolkPerformance[] = [
  {
    id: 'ghoomar',
    name: 'Ghoomar Royal Dance',
    hindiName: 'घूमर नृत्य',
    origin: 'Marwar & Mewar Royal Courts',
    tempo: 'Medium graceful circular twirls (Ghoomna)',
    instruments: ['Dholak', 'Nagara', 'Shehnai', 'Manjira'],
    description: 'Originally developed by the Bhil tribe and later embraced by Rajput royal courts, Ghoomar is danced by women veiled in vibrant multi-tiered poshaks with shimmering mirrors. The flowing ghaghara flares into a radiant kaleidoscope of gold and silk.',
    culturalSignificance: 'Traditionally performed by newlywed brides entering their marital royal households and during the sacred festival of Gangaur to honor Goddess Gauri.',
  },
  {
    id: 'kalbelia',
    name: 'Kalbelia Serpentine Dance',
    hindiName: 'कालबेलिया नृत्य',
    origin: 'Thar Desert Nomads (UNESCO Intangible Heritage)',
    tempo: 'Fast, hypnotic, rhythmic crescendo',
    instruments: ['Poongi (Been)', 'Duf', 'Khanjari', 'Morchang'],
    description: 'Sensuous, undulating dance created by the desert serpent-charming Kalbelia community. Women dressed in billowing black and crimson skirts adorned with cowrie shells and silver ribbons mimic the fluid, mesmerizing strike of the desert cobra.',
    culturalSignificance: 'Inscribed on the UNESCO Representative List of the Intangible Cultural Heritage of Humanity in 2010.',
  },
  {
    id: 'bhavai',
    name: 'Bhavai Equilibrium Dance',
    hindiName: 'भवाई नृत्य',
    origin: 'Shekhawati & Mewar',
    tempo: 'Intense balancing rhythm with high suspense',
    instruments: ['Pakhawaj', 'Jhanjhar', 'Sarangi'],
    description: 'An astonishing spectacle of physical equilibrium. Veiled female dancers balance up to eight to nine polished brass pots (matkas) on their heads while walking bare-soled on the naked blade of a sword or the sharp rim of a brass thali.',
    culturalSignificance: 'Demands years of rigorous discipline passed from mothers to daughters, symbolizing the resilience and grace of desert women carrying water across long dunes.',
  },
  {
    id: 'kathputli',
    name: 'Kathputli String Puppetry',
    hindiName: 'कठपुतली नाट्य',
    origin: 'Bhat Community of Nagaur',
    tempo: 'Theatrical whistling and acoustic percussion',
    instruments: ['Dholak', 'Boli (Bamboo reed whistle)'],
    description: 'Carved out of single pieces of mango wood and swathed in antique Rajasthani textiles, Kathputlis narrate epic ballads of Rajput chivalry, notably the defense of Agra fort by legend Amar Singh Rathore.',
    culturalSignificance: 'One of the oldest documented string puppetry traditions on earth, documented for over a thousand years.',
  },
];

export const FolkArts: React.FC = () => {
  const [activeArt, setActiveArt] = useState<FolkPerformance>(PERFORMANCES[0]);

  return (
    <section id="folk-arts" className="py-20 md:py-28 px-4 sm:px-8 max-w-7xl mx-auto border-t border-amber-400/15">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <span className="text-xs uppercase tracking-widest font-mono-numbers text-amber-400">
            02. Rhythms of the Dunes
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-amber-100 mt-2">
            Folk Arts & Royal Dances
          </h2>
        </div>
        <p className="max-w-md text-sm text-stone-300 font-serif-cormorant leading-relaxed">
          From the slow majestic swirl of royal palace Ghoomar to the hypnotic serpent cadences of the Thar desert starlight.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Visual Frame */}
        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-amber-400/25 bg-[#050C1F] shadow-2xl">
          <img
            src={ghoomarImg}
            alt="Rajasthani folk dancer performing Ghoomar in gold mirrorwork poshak"
            className="w-full h-[460px] object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030611] via-transparent to-black/20" />
          
          {/* Overlay Tag */}
          <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-black/65 backdrop-blur-md border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-xs font-cinzel font-bold text-amber-200">
                {activeArt.name}
              </div>
              <div className="text-[11px] font-serif-cormorant italic text-stone-300">
                {activeArt.origin}
              </div>
            </div>
            <button
              onClick={() => folkAudio.playNote(4, 0.6)}
              className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-mono-numbers hover:bg-amber-500/30 transition-colors cursor-pointer"
            >
              Sound Chime ♫
            </button>
          </div>
        </div>

        {/* Art Selection & Lore Column */}
        <div className="lg:col-span-6 space-y-6">
          {/* Interactive Selector */}
          <div className="grid grid-cols-2 gap-3">
            {PERFORMANCES.map((art) => {
              const isSelected = activeArt.id === art.id;
              return (
                <button
                  key={art.id}
                  onClick={() => {
                    setActiveArt(art);
                    folkAudio.playNote(1, 0.4);
                  }}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-400/80 text-amber-100 shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                      : 'bg-[#050C1F]/60 border-amber-400/15 text-stone-400 hover:text-amber-200 hover:bg-[#07112B]'
                  }`}
                >
                  <div className="text-[11px] font-mono-numbers text-amber-400/80 mb-1">
                    {art.hindiName}
                  </div>
                  <div className="font-cinzel font-bold text-sm">
                    {art.name.replace(' Royal Dance', '').replace(' Serpentine Dance', '').replace(' Equilibrium Dance', '').replace(' String Puppetry', '')}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Current Art Details */}
          <div className="p-6 rounded-2xl bg-[#050C1F] border border-amber-400/20 space-y-4">
            <div>
              <div className="text-xs font-mono-numbers uppercase tracking-wider text-amber-400 mb-1">
                Cadence & Origin · {activeArt.origin}
              </div>
              <h3 className="text-xl font-cinzel font-bold text-amber-100">
                {activeArt.name} ({activeArt.hindiName})
              </h3>
            </div>

            <p className="text-sm font-serif-cormorant text-stone-200 leading-relaxed">
              {activeArt.description}
            </p>

            <div className="p-3.5 rounded-lg bg-black/40 border border-white/5">
              <span className="text-[11px] uppercase tracking-wider text-amber-300 font-mono-numbers block mb-1">
                Heritage Weight
              </span>
              <p className="text-xs font-serif-cormorant text-stone-300">
                {activeArt.culturalSignificance}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-amber-400/15 text-xs text-amber-200/80 font-mono-numbers">
              <span className="text-stone-400">Living Instruments:</span>
              {activeArt.instruments.map((inst, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-400/20">
                  {inst}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
