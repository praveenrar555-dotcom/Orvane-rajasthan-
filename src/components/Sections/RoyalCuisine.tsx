import React, { useState } from 'react';

interface Dish {
  id: string;
  name: string;
  hindiName: string;
  course: string;
  keyIngredients: string;
  legend: string;
  flavorProfile: string;
  royalLore: string;
}

const DISHES: Dish[] = [
  {
    id: 'dal-baati-churma',
    name: 'Dal Baati Churma',
    hindiName: 'दाल बाटी चूरमा',
    course: 'Grand Royal Thali Centerpiece',
    keyIngredients: 'Coarse whole wheat flour, five lentils (Panchmel), pure cow desi ghee, jaggery',
    legend: 'Originated during the reign of Rawal Bappa Rawal in the 8th century. Rajput soldiers would bury dough balls in scorching desert sand at dawn; upon returning from battle at dusk, the baatis were dug up perfectly baked by desert heat, ready to be soaked in golden ghee.',
    flavorProfile: 'Earthy, smoky, deeply comforting with contrasting sweet cardamom churma.',
    royalLore: 'Crumbled by hand at royal banquets until thoroughly saturated with boiling fragrant clarified butter.',
  },
  {
    id: 'laal-maas',
    name: 'Shahi Laal Maas',
    hindiName: 'शाही लाल मांस',
    course: 'Warrior Hunt Feast (Shikar)',
    keyIngredients: 'Tender goat mutton, Mathania dried red chilies, garlic pods, mustard oil, burning charcoal clove dhungar',
    legend: 'Devised by royal palace khansamas on imperial hunting expeditions (shikar). To mask the gamy scent of wild boar and desert deer without vegetables available in the dunes, chefs used astronomical quantities of pungent Mathania chilies and garlic.',
    flavorProfile: 'Intense fiery crimson heat with smoky charcoal clove aroma that warms the desert night.',
    royalLore: 'Infused via "Dhungar" — red-hot charcoal placed in a small bowl inside the handi, sprinkled with cloves and ghee, and immediately sealed.',
  },
  {
    id: 'ker-sangri',
    name: 'Ker Sangri Panchkutta',
    hindiName: 'केर सांगरी पंचकुटा',
    course: 'Desert Foraged Delicacy',
    keyIngredients: 'Wild Khejri tree beans (Sangri), wild desert berry capers (Ker), dried unripe mango (Amchur), cumin seeds',
    legend: 'Born during ancient Thar famines when no vegetation grew except on the sacred indigenous Khejri tree. Desert mothers discovered the dried pods retained nutrition for months and developed an unctuous delicacy without a single drop of fresh water.',
    flavorProfile: 'Tangy, tart, piquant, with firm desert seed crunch.',
    royalLore: 'Long-lasting staple carried by royal camel caravans across hundreds of miles of sand without spoiling.',
  },
  {
    id: 'shahi-ghevar',
    name: 'Malai Ghevar & Mawa Kachori',
    hindiName: 'मलाई घेवर व मावा कचौरी',
    course: 'Imperial Dessert & Teej Treat',
    keyIngredients: 'Flour lattice batter, iced ghee crystallization, saffron syrup, thickened rabdi, pistachios',
    legend: 'A dessert masterpiece of thermodynamic physics. Cold iced-water batter dripped into smoking hot clarified butter creates an intricate honeycomb disk with thousands of microscopic capillary chambers that absorb fragrant saffron syrup.',
    flavorProfile: 'Crisp airy crunch melting into lush cardamom cream and silver vark leaves.',
    royalLore: 'Presented in silver thalis to royal sisters and brides during the monsoon festival of Teej.',
  },
];

export const RoyalCuisine: React.FC = () => {
  const [activeDish, setActiveDish] = useState<Dish>(DISHES[0]);

  return (
    <section id="cuisine" className="py-20 md:py-28 px-4 sm:px-8 max-w-7xl mx-auto border-t border-amber-400/15">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <span className="text-xs uppercase tracking-widest font-mono-numbers text-amber-400">
            04. Flavors of Rajputana
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-amber-100 mt-2">
            The Royal Rasoi
          </h2>
        </div>
        <p className="max-w-md text-sm text-stone-300 font-serif-cormorant leading-relaxed">
          Culinary alchemy born of wartime desert scarcity, Mathania scarlet embers, and lavish palace banquets served in pure silver thalis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Dishes Selector List */}
        <div className="lg:col-span-5 space-y-3">
          {DISHES.map((dish) => {
            const isSelected = activeDish.id === dish.id;
            return (
              <button
                key={dish.id}
                onClick={() => setActiveDish(dish)}
                className={`w-full p-5 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-400/80 shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                    : 'bg-[#050C1F]/60 border-amber-400/15 hover:border-amber-400/40 hover:bg-[#07112B]'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-amber-400/80 font-mono-numbers mb-1">
                  <span>{dish.course}</span>
                  <span>{dish.hindiName}</span>
                </div>
                <h3 className="font-cinzel font-bold text-amber-100 text-lg">
                  {dish.name}
                </h3>
                <p className="text-xs text-stone-400 font-serif-cormorant mt-1">
                  {dish.flavorProfile}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Dish Deep Dive */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#050C1F] border border-amber-400/25 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-numbers text-amber-400 mb-2">
              <span>{activeDish.course}</span>
              <span>·</span>
              <span>{activeDish.hindiName}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-amber-100 mb-4">
              {activeDish.name}
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-300 font-mono-numbers block mb-1">
                  Historical Origin & Desert Legend
                </span>
                <p className="text-sm font-serif-cormorant text-stone-200 leading-relaxed">
                  {activeDish.legend}
                </p>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-amber-300 font-mono-numbers block mb-1">
                  Palace Culinary Secret
                </span>
                <p className="text-sm font-serif-cormorant text-stone-300 leading-relaxed italic">
                  "{activeDish.royalLore}"
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-amber-400/15 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono-numbers text-amber-200/90">
            <div>
              <span className="text-stone-400 block mb-0.5">Key Ingredients:</span>
              <span>{activeDish.keyIngredients}</span>
            </div>
            <div>
              <span className="text-stone-400 block mb-0.5">Sensory Profile:</span>
              <span>{activeDish.flavorProfile}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
