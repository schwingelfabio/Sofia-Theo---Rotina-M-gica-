import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGame } from '../state/GameContext';
import { ArrowLeft, Check, Shirt, Headphones, Sparkles } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { playClick, playUnlock } from '../lib/audio';

export const WardrobeScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { language, activeCharacter, setActiveCharacter, customization, setCustomization } = useGame();
  const isPt = language === 'pt';

  const OUTFITS = [
    { id: 'casual', pt: 'Casual', en: 'Casual' },
    { id: 'school', pt: 'Escola', en: 'School' },
    { id: 'pajamas', pt: 'Pijama', en: 'Pajamas' },
    { id: 'superhero', pt: 'Super-Herói', en: 'Superhero' }
  ];

  const ACCESSORIES = [
    { id: 'none', pt: 'Nenhum', en: 'None' },
    { id: 'headphones', pt: 'Fones', en: 'Headphones' },
    { id: 'glasses', pt: 'Óculos', en: 'Glasses' },
    { id: 'cap', pt: 'Boné', en: 'Cap' },
    { id: 'cape', pt: 'Capa', en: 'Cape' }
  ];

  const charCust = customization[activeCharacter];

  const handleSelectOutfit = (val: string) => {
    if (charCust.outfit !== val) {
      playClick();
      setCustomization(activeCharacter, 'outfit', val);
    }
  };

  const handleSelectAccessory = (val: string) => {
    if (charCust.accessory !== val) {
      playUnlock();
      setCustomization(activeCharacter, 'accessory', val);
    }
  };

  const handleToggleChar = () => {
    playClick();
    setActiveCharacter(activeCharacter === 'sofia' ? 'theo' : 'sofia');
  };

  const handleBack = () => {
    playClick();
    onBack();
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Left Profile Area */}
      <div className="md:w-1/3 flex flex-col items-center">
        <div className="w-full flex items-center mb-6">
          <button 
            onClick={handleBack}
            className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-md border-b-4 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-[#FF69B4] hover:-translate-y-0.5 transition-all"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="ml-4">
            <h2 className="text-2xl font-black text-[#9370DB] dark:text-[#ab8af0] tracking-tight">{isPt ? 'Guarda-Roupa' : 'Wardrobe'}</h2>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-[40px] p-8 shadow-2xl border-4 border-white dark:border-slate-700 flex flex-col items-center w-full relative overflow-hidden">
          <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-[#9370DB]/20 to-transparent pointer-events-none" />
          
          <motion.div
            key={activeCharacter + charCust.outfit + charCust.accessory}
            initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <Avatar character={activeCharacter} size={160} className="shadow-xl" />
          </motion.div>

          {/* Toggle Character */}
          <button 
            onClick={handleToggleChar}
            className="mt-8 bg-[#F3F0FF] dark:bg-slate-700 text-[#9370DB] dark:text-[#ab8af0] px-6 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform flex items-center gap-2 border-2 border-[#9370DB]/20 shadow-sm"
          >
            <Sparkles size={16} />
            {isPt ? `Mudar para ${activeCharacter === 'sofia' ? 'Theo' : 'Sofia'}` : `Switch to ${activeCharacter === 'sofia' ? 'Theo' : 'Sofia'}`}
          </button>
        </div>
      </div>

      {/* Right Customization Options */}
      <div className="md:w-2/3 flex flex-col gap-6">
        
        {/* Outfits */}
        <div className="bg-white dark:bg-slate-800 rounded-[32px] p-6 shadow-xl border-4 border-[#008080]/10 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <Shirt className="text-[#008080] dark:text-[#00caca]" size={24} />
            <h3 className="text-xl font-bold text-[#2D3748] dark:text-slate-100">{isPt ? 'Roupas' : 'Outfits'}</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {OUTFITS.map(o => (
              <button
                key={o.id}
                onClick={() => handleSelectOutfit(o.id)}
                className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-2 border-4 transition-all ${charCust.outfit === o.id ? 'border-[#008080] bg-[#008080]/10 dark:bg-[#008080]/30 shadow-md transform scale-105' : 'border-slate-100 dark:border-slate-700 hover:border-[#008080]/30'}`}
              >
                <div className={`w-10 h-10 rounded-full border-2 border-white/50 shadow-sm`} style={{ backgroundColor: getOutfitColorValue(o.id, activeCharacter) }} />
                <span className={`text-xs font-bold ${charCust.outfit === o.id ? 'text-[#008080] dark:text-teal-300' : 'text-slate-500 dark:text-slate-400'}`}>
                  {isPt ? o.pt : o.en}
                </span>
                {charCust.outfit === o.id && <Check size={16} className="absolute top-2 right-2 text-[#008080]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Accessories */}
        <div className="bg-white dark:bg-slate-800 rounded-[32px] p-6 shadow-xl border-4 border-[#FFA500]/20 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <Headphones className="text-[#FFA500]" size={24} />
            <h3 className="text-xl font-bold text-[#2D3748] dark:text-slate-100">{isPt ? 'Acessórios' : 'Accessories'}</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ACCESSORIES.map(a => (
              <button
                key={a.id}
                onClick={() => handleSelectAccessory(a.id)}
                className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border-4 transition-all ${charCust.accessory === a.id ? 'border-[#FFA500] bg-[#FFA500]/10 dark:bg-[#FFA500]/20 shadow-md transform scale-105' : 'border-slate-100 dark:border-slate-700 hover:border-[#FFA500]/30'}`}
              >
                <div className="text-2xl">{getAccessoryEmoji(a.id)}</div>
                <span className={`text-xs font-bold ${charCust.accessory === a.id ? 'text-[#FFA500] dark:text-yellow-400' : 'text-slate-500 dark:text-slate-400'}`}>
                  {isPt ? a.pt : a.en}
                </span>
                {charCust.accessory === a.id && <Check size={16} className="absolute top-2 right-2 text-[#FFA500]" />}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

function getOutfitColorValue(outfit: string, character: string) {
  const colors: Record<string, string> = {
    casual: character === 'sofia' ? '#ff9ed2' : '#4fd1d1',
    school: '#4B0082',
    pajamas: '#87CEFA',
    superhero: '#FF4500'
  };
  return colors[outfit] || colors.casual;
}

function getAccessoryEmoji(acc: string) {
  switch (acc) {
    case 'none': return '✖️';
    case 'headphones': return '🎧';
    case 'glasses': return '👓';
    case 'cap': return '🧢';
    case 'cape': return '🦸';
    default: return '🎀';
  }
}
