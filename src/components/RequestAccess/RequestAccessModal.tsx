import React, { useState } from 'react';
import { folkAudio } from '../../utils/audio';

interface RequestAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequestAccessModal: React.FC<RequestAccessModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    province: 'Marwar (Jodhpur)',
    purpose: 'Cultural Heritage & Living Arts',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    folkAudio.playBurstChord();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#040817] border border-amber-400/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(212,175,55,0.25)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-stone-300 hover:text-white transition-colors cursor-pointer"
        >
          ✕
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-mono-numbers uppercase tracking-widest text-amber-400">
                ORVANE RAJASTHAN · AUDIENCE ACCESS
              </span>
              <h2 className="text-2xl font-cinzel font-bold text-amber-100 mt-1">
                Request Royal Audience
              </h2>
              <p className="text-xs font-serif-cormorant text-stone-300 mt-1.5 leading-relaxed">
                Join the private curatorial registry for bespoke palace access, private museum archives, and guided master artisan ateliers across Rajasthan.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono-numbers uppercase tracking-wider text-amber-300/80 mb-1">
                  Full Name / Honorific
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Maharaja Vikramaditya / Elena Rostova"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-amber-400/30 text-amber-100 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-numbers uppercase tracking-wider text-amber-300/80 mb-1">
                  Email Dispatch
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="patron@royalheritage.org"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-amber-400/30 text-amber-100 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-numbers uppercase tracking-wider text-amber-300/80 mb-1">
                    Province Focus
                  </label>
                  <select
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-black/50 border border-amber-400/30 text-amber-100 text-sm focus:outline-none focus:border-amber-400"
                  >
                    <option value="Marwar (Jodhpur)">Marwar (Jodhpur)</option>
                    <option value="Mewar (Udaipur)">Mewar (Udaipur)</option>
                    <option value="Dhundhar (Jaipur)">Dhundhar (Jaipur)</option>
                    <option value="Thar (Jaisalmer)">Thar (Jaisalmer)</option>
                    <option value="Shekhawati (Havelis)">Shekhawati (Havelis)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono-numbers uppercase tracking-wider text-amber-300/80 mb-1">
                    Journey Purpose
                  </label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-black/50 border border-amber-400/30 text-amber-100 text-sm focus:outline-none focus:border-amber-400"
                  >
                    <option value="Cultural Heritage & Living Arts">Heritage & Living Arts</option>
                    <option value="Architectural Preservation">Fortress Architecture</option>
                    <option value="Culinary & Royal Rasoi Study">Royal Rasoi Study</option>
                    <option value="Private Collector Acquisition">Artisanal Guilds</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 font-cinzel font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all cursor-pointer"
              >
                Submit Audience Request →
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-300 text-2xl">
              ✓
            </div>
            <h3 className="text-2xl font-cinzel font-bold text-amber-100">
              Royal Docket Dispatched
            </h3>
            <p className="text-sm font-serif-cormorant text-stone-300 max-w-sm mx-auto leading-relaxed">
              Honored guest, your audience petition for <strong>{formData.province}</strong> has been logged in the Orvane Rajasthan curatorial registry.
            </p>
            <div className="p-4 rounded-xl bg-black/40 border border-amber-400/20 text-xs font-mono-numbers text-amber-300">
              Docket Ref: RAJ-{Math.floor(100000 + Math.random() * 900000)} · Verified
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-amber-400 text-stone-950 font-cinzel font-bold text-xs uppercase cursor-pointer"
            >
              Return to Sovereign Viewport
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
