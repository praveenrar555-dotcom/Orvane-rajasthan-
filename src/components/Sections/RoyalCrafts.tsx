import React, { useState } from 'react';
import craftsImg from '../../assets/images/rajasthan_heritage_crafts_1790950066058.jpg';

interface Craft {
  id: string;
  title: string;
  hindiTitle: string;
  center: string;
  material: string;
  patronage: string;
  details: string;
  technique: string;
}

const CRAFTS: Craft[] = [
  {
    id: 'blue-pottery',
    title: 'Jaipur Blue Pottery',
    hindiTitle: 'जयपुर ब्लू पॉटरी',
    center: 'Jaipur (Kot Jewar Guilds)',
    material: 'Ground quartz stone, glass, fullers earth & gum (Zero clay)',
    patronage: 'Revitalized by Maharaja Sawai Ram Singh II in the 19th Century',
    details: 'Unlike traditional pottery thrown on wheels with natural clay, Jaipur blue pottery uses a dough of crushed quartz stone, raw glass, and gum. Painted with brushwork in Egyptian blue and cobalt oxide, it never develops cracks and resists moisture indefinitely.',
    technique: 'Fired only once at low heat (800°C) with copper oxide providing radiant turquoise and cobalt oxide yielding deep royal indigo.',
  },
  {
    id: 'kundan-meenakari',
    title: 'Kundan & Meenakari Enameling',
    hindiTitle: 'कुंदन व मीनाकारी आभूषण',
    center: 'Johari Bazaar, Jaipur',
    material: '24K purified gold foil, uncut Polki diamonds, rubies & glass enamel',
    patronage: 'Introduced by Raja Man Singh I from Lahore courts',
    details: 'Kundan refers to hyper-purified molten gold pressed cold around gems without soldering. On the reverse, artisans etch miniature birds and flowers filled with pulverized mineral enamels (Meenakari), so the jewelry is as dazzling on the unseen skin side as on the front.',
    technique: 'Artisans use hollowed-out bamboo quills to burnish 24K gold foil ribbons into interlocking molecular bonds around the stone edges.',
  },
  {
    id: 'bandhani-leheriya',
    title: 'Bandhani & Leheriya Textiles',
    hindiTitle: 'बंधेज व लहरिया',
    center: 'Jodhpur, Sikar & Bikaner',
    material: 'Fine mulmul cotton and pure gajji silk',
    patronage: 'Royal turbans (pagris) and bridal odhnis since the 6th century',
    details: 'The ancient art of resist-dyeing where women pluck minuscule pinches of cloth with fingernails and bind them with waxed cotton thread into millions of intricate dots (Bandhani) or diagonal wave patterns (Leheriya) evoking the desert wind ripples.',
    technique: 'A single royal turban can incorporate upwards of 100,000 individually hand-tied knots before immersion into turmeric, indigo, and madder root dyes.',
  },
  {
    id: 'block-print',
    title: 'Sanganeri & Bagru Block Printing',
    hindiTitle: 'सांगानेरी व बगरू छपाई',
    center: 'Sanganer & Bagru villages',
    material: 'Teakwood blocks (Bila & Datta) with fermented mud & harda',
    patronage: 'Sovereign court robes and palace floor spreads (Jajams)',
    details: 'Chippa artisans carve botanical patterns into seasoned sheesham wood. Bagru printing uses natural Dabu resist (a paste of black clay, lime, and gum), dipped into deep fermented indigo vats that have bubbled for over 50 years.',
    technique: 'Perfect alignment (Gadh) achieved purely by eye and rhythmic fist thumps across 10-meter fabric lengths.',
  },
];

export const RoyalCrafts: React.FC = () => {
  const [selectedCraft, setSelectedCraft] = useState<Craft>(CRAFTS[0]);

  return (
    <section id="crafts" className="py-20 md:py-28 px-4 sm:px-8 max-w-7xl mx-auto border-t border-amber-400/15">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <span className="text-xs uppercase tracking-widest font-mono-numbers text-amber-400">
            03. Living Guilds & Master Artisans
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-amber-100 mt-2">
            Royal Crafts & Treasures
          </h2>
        </div>
        <p className="max-w-md text-sm text-stone-300 font-serif-cormorant leading-relaxed">
          Master techniques preserved across dynasties, transforming quartz, 24K gold foil, and madder dyes into timeless museum relics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Detail Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="grid grid-cols-2 gap-3">
            {CRAFTS.map((craft) => {
              const isSelected = selectedCraft.id === craft.id;
              return (
                <button
                  key={craft.id}
                  onClick={() => setSelectedCraft(craft)}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-400/80 text-amber-100 shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                      : 'bg-[#050C1F]/60 border-amber-400/15 text-stone-400 hover:text-amber-200 hover:bg-[#07112B]'
                  }`}
                >
                  <div className="text-[11px] font-mono-numbers text-amber-400/80 mb-1">
                    {craft.hindiTitle}
                  </div>
                  <div className="font-cinzel font-bold text-sm">
                    {craft.title.split(' ')[0]} {craft.title.split(' ')[1]}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-6 rounded-2xl bg-[#050C1F] border border-amber-400/20 space-y-4">
            <div className="flex items-center justify-between text-xs text-amber-400 font-mono-numbers">
              <span>Center: {selectedCraft.center}</span>
              <span>Royal Lineage</span>
            </div>
            
            <h3 className="text-xl font-cinzel font-bold text-amber-100">
              {selectedCraft.title}
            </h3>

            <p className="text-sm font-serif-cormorant text-stone-200 leading-relaxed">
              {selectedCraft.details}
            </p>

            <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 space-y-1.5">
              <span className="text-[11px] uppercase tracking-wider text-amber-300 font-mono-numbers block">
                Artisanal Technique
              </span>
              <p className="text-xs font-serif-cormorant text-stone-300">
                {selectedCraft.technique}
              </p>
            </div>

            <div className="text-xs text-amber-200/80 font-mono-numbers pt-2 border-t border-amber-400/15">
              <span className="text-stone-400">Primary Medium:</span> {selectedCraft.material}
            </div>
          </div>
        </div>

        {/* Visual Showcase */}
        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-amber-400/25 bg-[#050C1F] shadow-2xl">
          <img
            src={craftsImg}
            alt="Jaipur Blue Pottery and handcrafted Kundan gold jewelry"
            className="w-full h-[460px] object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030611] via-transparent to-black/20" />
          
          <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
            <div className="text-xs font-mono-numbers text-amber-300 uppercase tracking-wider mb-1">
              Museum Accession Craft Specimen
            </div>
            <div className="text-sm font-cinzel font-bold text-amber-100">
              Cobalt Quartz Glaze & Cold-Formed 24K Kundan Inlay
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
