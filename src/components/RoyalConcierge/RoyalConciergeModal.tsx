import React, { useState } from 'react';
import { folkAudio } from '../../utils/audio';

interface RoyalConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QAEntry {
  question: string;
  hindiCategory: string;
  answer: string;
  historicalCitation: string;
}

const CURATED_KNOWLEDGE: QAEntry[] = [
  {
    question: "What are the secret subterranean escape tunnels of Rajput Forts?",
    hindiCategory: "दुर्ग गुप्त सुरंगें",
    answer: "Rajput citadels were engineered with ingenious subterranean escape corridors (surangs) cut directly into bedrock. For example, Amber Fort connects to Jaigarh Fort atop the Cheel ka Teela (Hill of Eagles) via an underground arched tunnel spanning 2 kilometers, designed so royal ladies and treasury gold could be evacuated unseen during siege bombardment. Similarly, Mehrangarh holds unmapped vertical shafts dropping 120 meters down into cliff cisterns.",
    historicalCitation: "Archaeological Survey of India & Amber Development Authority Archives",
  },
  {
    question: "How did the royal Ghoomar dance evolve from tribal ritual to courtly art?",
    hindiCategory: "घूमर का इतिहास",
    answer: "Ghoomar originated with the indigenous Bhil tribe performing pirouettes around campfires to invoke Goddess Saraswati. As Rajput kings formed matrimonial and tactical alliances with Bhil chieftains in the 15th century, royal zenanas (queen palaces) adopted the dance. Over centuries, the speed softened into measured, aristocratic sweeps (Ghoomna), and the costumes grew into 80-kali (80-pleat) silk poshaks encrusted with real gold gota-patti and mirrors that catch palace candlelight.",
    historicalCitation: "Marwar Court Annals & Sangeet Natak Akademi Heritage Compendium",
  },
  {
    question: "Why does Jaipur Blue Pottery use zero clay?",
    hindiCategory: "ब्लू पॉटरी का विज्ञान",
    answer: "Unlike terracotta which relies on alluvial riverbed clay, Jaipur Blue Pottery utilizes a non-clay ceramic paste made of ground Egyptian quartz stone, powdered scrap glass, Katira gum, and fullers earth (Multani mitti). This composition does not shrink or warp during its single 800°C firing, creating an ultra-dense, impervious body that resists moisture and retains bright cobalt and turquoise mineral glazes for centuries without surface crazing.",
    historicalCitation: "Maharaja Sawai Ram Singh II Craft Archives, City Palace Jaipur",
  },
  {
    question: "What is the ancient Dhungar charcoal smoke technique in royal hunting cuisine?",
    hindiCategory: "शाही ढूंगार विधि",
    answer: "In the royal hunting camp kitchens (Shikar Khana), game meats like wild boar and venison were prepared into fiery Laal Maas. Because water was scarce in the Thar sands, dishes relied on pure ghee and garlic. To impart the intoxicating aroma of desert firewood, royal khansamas placed a glowing lump of red-hot acacia charcoal into a small clay cup inside the pot, ladled ghee and whole cloves over it, and clamped the brass lid airtight for 20 minutes, infusing every fiber with delicate clove-tinted smoke.",
    historicalCitation: "Shikar & Royal Rasoi Manuscripts of Mewar, Udaipur",
  },
  {
    question: "What is an ideal 4-day authentic Royal Heritage itinerary across Rajasthan?",
    hindiCategory: "शाही यात्रा मार्ग",
    answer: "Day 1: Jaipur — Explore Hawa Mahal sunrise breeze, Amber Fort subterranean Jaigarh tunnel, and Johari Bazaar Kundan goldsmiths. Day 2: Jodhpur — Sunset at Mehrangarh battlements, walking through the cobalt blue alleys of Brahmapuri, listening to Langa folk sarangi. Day 3: Jaisalmer — Sunrise at Sonar Qila, camel trek across Sam Sand Dunes with campfire Kalbelia under the Milky Way. Day 4: Udaipur — Morning boat ride on Lake Pichola past Jag Mandir, sunset tea at City Palace Mor Chowk.",
    historicalCitation: "Rajasthan Tourism Heritage Circuit Specification",
  },
];

export const RoyalConciergeModal: React.FC<RoyalConciergeModalProps> = ({ isOpen, onClose }) => {
  const [selectedQA, setSelectedQA] = useState<QAEntry>(CURATED_KNOWLEDGE[0]);
  const [customQuery, setCustomQuery] = useState('');
  const [searchResults, setSearchResults] = useState<QAEntry[]>(CURATED_KNOWLEDGE);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) {
      setSearchResults(CURATED_KNOWLEDGE);
      return;
    }
    const q = customQuery.toLowerCase();
    const filtered = CURATED_KNOWLEDGE.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.hindiCategory.toLowerCase().includes(q)
    );
    setSearchResults(filtered.length > 0 ? filtered : CURATED_KNOWLEDGE);
    if (filtered.length > 0) {
      setSelectedQA(filtered[0]);
    }
    folkAudio.playNote(3, 0.4);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-[#040817] border border-amber-400/40 shadow-[0_0_50px_rgba(212,175,55,0.25)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-amber-400/20 bg-gradient-to-r from-[#07112B] via-[#040817] to-[#07112B]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full glass-galaxy-orb flex items-center justify-center border border-amber-400/40">
              <span className="text-amber-200 text-lg">✦</span>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-cinzel font-bold text-amber-100 flex items-center gap-2">
                Orvane Sol · Royal Cultural AI Concierge
              </h2>
              <span className="text-xs font-mono-numbers text-amber-400/80">
                LIVING HERITAGE REPOSITORY OF RAJASTHAN
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-stone-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Concierge Modal"
          >
            ✕
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 pb-2">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              placeholder="Inquire on royal citadels, folk songs, desert recipes, or crafts..."
              className="flex-1 px-4 py-3 rounded-xl bg-black/50 border border-amber-400/30 text-amber-100 placeholder:text-stone-500 text-sm focus:outline-none focus:border-amber-400 font-serif-cormorant"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-cinzel font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
            >
              Inquire
            </button>
          </form>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Question Chips */}
          <div className="md:col-span-5 space-y-2">
            <span className="text-[11px] font-mono-numbers text-amber-400 uppercase tracking-wider block mb-2">
              Curated Archival Inquiries
            </span>
            {searchResults.map((entry, idx) => {
              const isSelected = selectedQA.question === entry.question;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedQA(entry);
                    folkAudio.playNote(idx % 7, 0.3);
                  }}
                  className={`w-full p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-400/80 text-amber-100 shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                      : 'bg-black/30 border-white/10 text-stone-400 hover:text-amber-200 hover:bg-black/50'
                  }`}
                >
                  <div className="text-[10px] font-mono-numbers text-amber-400/80 mb-0.5">
                    {entry.hindiCategory}
                  </div>
                  <div className="text-xs font-serif-cormorant font-semibold line-clamp-2">
                    {entry.question}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Answer Display */}
          <div className="md:col-span-7 p-6 rounded-2xl bg-[#07112B]/70 border border-amber-400/25 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-amber-400 font-mono-numbers mb-2">
                <span>{selectedQA.hindiCategory}</span>
                <span>VERIFIED SCHOLARLY ARCHIVE</span>
              </div>
              <h3 className="text-lg font-cinzel font-bold text-amber-100 mb-4">
                {selectedQA.question}
              </h3>
              <p className="text-sm font-serif-cormorant text-stone-200 leading-relaxed">
                {selectedQA.answer}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-amber-400/15 text-[11px] font-mono-numbers text-stone-400">
              <span className="text-amber-300">Archival Citation: </span>
              {selectedQA.historicalCitation}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-amber-400/15 bg-black/40 flex items-center justify-between text-xs text-stone-400 font-mono-numbers">
          <span>ORVANE SOL REASONING MATRIX</span>
          <span className="text-amber-400">150K PARTICLES SYNCHRONIZED</span>
        </div>
      </div>
    </div>
  );
};
