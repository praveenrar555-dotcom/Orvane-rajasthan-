import React, { useState } from 'react';
import { folkAudio } from '../../utils/audio';

const SWARAS = [
  { note: 'Sa', hindi: 'सा', freq: '293.66 Hz', meaning: 'Fundamental (Tonic)' },
  { note: 'Re', hindi: 'रे', freq: '330.37 Hz', meaning: 'Chatushruti Rishabh' },
  { note: 'Ga', hindi: 'ग', freq: '367.08 Hz', meaning: 'Shuddha Gandhar' },
  { note: 'Ma', hindi: 'म', freq: '391.55 Hz', meaning: 'Shuddha Madhyam' },
  { note: 'Pa', hindi: 'प', freq: '440.49 Hz', meaning: 'Pancham (Fifth)' },
  { note: 'Dha', hindi: 'ध', freq: '489.43 Hz', meaning: 'Shuddha Dhaivat' },
  { note: 'Ni', hindi: 'नि', freq: '550.61 Hz', meaning: 'Shuddha Nishad' },
  { note: 'Tār Sa', hindi: 'सां', freq: '587.32 Hz', meaning: 'Higher Octave' },
];

export const FolkSoundStudio: React.FC = () => {
  const [activeNote, setActiveNote] = useState<number | null>(null);
  const [isPlayingDrone, setIsPlayingDrone] = useState<boolean>(!folkAudio.getMutedStatus());

  const handlePlayNote = (index: number) => {
    setActiveNote(index);
    folkAudio.playNote(index, 0.8);
    setTimeout(() => setActiveNote(null), 300);
  };

  const toggleDrone = () => {
    const isPlaying = folkAudio.toggleMute();
    setIsPlayingDrone(isPlaying);
  };

  return (
    <section id="sound-studio" className="py-20 md:py-28 px-4 sm:px-8 max-w-7xl mx-auto border-t border-amber-400/15">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <span className="text-xs uppercase tracking-widest font-mono-numbers text-amber-400">
            05. Acoustic Heritage & Raag Mand
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-amber-100 mt-2">
            The Desert Sound Chamber
          </h2>
        </div>
        <p className="max-w-md text-sm text-stone-300 font-serif-cormorant leading-relaxed">
          Interact with authentic desert scale frequencies. Touch any swara to resonate the ancient harmonics of the Rajasthani royal court.
        </p>
      </div>

      <div className="p-6 sm:p-10 rounded-2xl bg-[#050C1F] border border-amber-400/25 shadow-2xl space-y-8">
        {/* Drone Master Control */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-amber-400/15">
          <div>
            <div className="text-xs font-mono-numbers text-amber-400 uppercase tracking-wider mb-1">
              Continuous Resonant Field
            </div>
            <h3 className="text-lg font-cinzel font-bold text-amber-100">
              Pumpkin Gourd Tanpura Drone (Sa-Pa Tuning)
            </h3>
            <p className="text-xs text-stone-400 font-serif-cormorant mt-0.5">
              Synthesized through Web Audio API low-frequency Javari buzz oscillators
            </p>
          </div>

          <button
            onClick={toggleDrone}
            className={`px-5 py-2.5 rounded-full font-cinzel font-bold text-xs tracking-wider transition-all cursor-pointer ${
              isPlayingDrone
                ? 'bg-amber-400 text-stone-950 shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                : 'bg-black/50 text-amber-200 border border-amber-400/40 hover:bg-amber-500/10'
            }`}
          >
            {isPlayingDrone ? 'TANPURA ACTIVE ♫' : 'ENABLE TANPURA DRONE'}
          </button>
        </div>

        {/* Swara Keypad (Interactive scale) */}
        <div>
          <div className="text-xs font-mono-numbers text-amber-300/80 uppercase tracking-wider mb-4">
            Raag Mand Royal Octave Keys (Tap to resonate)
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {SWARAS.map((swara, idx) => {
              const isTriggered = activeNote === idx;
              return (
                <button
                  key={swara.note}
                  onClick={() => handlePlayNote(idx)}
                  className={`p-4 rounded-xl text-center border transition-all cursor-pointer select-none ${
                    isTriggered
                      ? 'bg-amber-400 text-stone-950 border-amber-300 scale-95 shadow-[0_0_25px_rgba(212,175,55,0.8)]'
                      : 'bg-[#07112B] text-amber-100 border-amber-400/20 hover:border-amber-400/60 hover:bg-amber-500/10'
                  }`}
                >
                  <div className="text-2xl font-cinzel font-black mb-1">
                    {swara.note}
                  </div>
                  <div className="text-xs font-bold text-amber-400 mb-2">
                    {swara.hindi}
                  </div>
                  <div className="text-[10px] font-mono-numbers text-stone-400">
                    {swara.freq}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Traditional Desert Instruments Grid */}
        <div className="pt-6 border-t border-amber-400/15 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-serif-cormorant text-stone-300">
          <div className="p-4 rounded-lg bg-black/30 border border-white/5">
            <span className="font-cinzel font-bold text-amber-200 block mb-1 text-sm">
              Sarangi (100 Colors of Sound)
            </span>
            Carved from single red cedar blocks with 29 sympathetic steel resonator strings creating the nearest acoustic replica of the human vocal cry.
          </div>
          <div className="p-4 rounded-lg bg-black/30 border border-white/5">
            <span className="font-cinzel font-bold text-amber-200 block mb-1 text-sm">
              Morchang (Desert Jaw Harp)
            </span>
            Held between the teeth while modulating the oral cavity to create the galloping camel rhythm across starlit sand dunes.
          </div>
          <div className="p-4 rounded-lg bg-black/30 border border-white/5">
            <span className="font-cinzel font-bold text-amber-200 block mb-1 text-sm">
              Khartal (Wood Castanets)
            </span>
            Smooth sheesham wood pairs held between the fingers of Langa musicians, clicking at dizzying syncopated cadences.
          </div>
        </div>
      </div>
    </section>
  );
};
