import React from 'react';
import { UserCircle2 } from 'lucide-react';
import { useGame } from '../state/GameContext';

interface AvatarProps {
  character: 'sofia' | 'theo';
  size?: number;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ character, size = 48, className = '' }) => {
  const { customization } = useGame();
  
  const charCust = customization[character];
  const outfit = charCust.outfit;
  const accessory = charCust.accessory;

  // We could build an elaborate SVG component here. 
  // For now, we will use basic shapes and colors using relative divs mimicking SVG elements.
  
  const baseColor = character === 'sofia' ? '#FF69B4' : '#008080';
  const bgColor = character === 'sofia' ? 'bg-pink-100 dark:bg-pink-900' : 'bg-teal-100 dark:bg-teal-900';

  // Outfit colors
  const outfitColors: Record<string, string> = {
    casual: character === 'sofia' ? '#ff9ed2' : '#4fd1d1',
    school: '#4B0082', // Indigo 
    pajamas: '#87CEFA', // Light blue
    superhero: '#FF4500' // OrangeRed
  };

  const getOutfitColor = () => outfitColors[outfit] || outfitColors.casual;

  return (
    <div 
      className={`relative rounded-full border-4 flex items-center justify-center overflow-hidden shadow-sm ${bgColor} ${className}`}
      style={{ width: size, height: size, borderColor: baseColor }}
    >
      {/* Body / Shirt */}
      <div 
        className="absolute bottom-0 w-3/4 h-2/5 rounded-t-full transition-colors duration-300"
        style={{ backgroundColor: getOutfitColor() }}
      />
      
      {/* Head */}
      <div 
        className="absolute bottom-1/4 w-1/2 h-1/2 rounded-full border-2 border-white flex flex-col items-center justify-center"
        style={{ backgroundColor: character === 'sofia' ? '#FFE4C4' : '#DEB887' }} // Skin tones
      >
        {/* Hair base */}
        <div 
          className="absolute -top-2 w-[110%] h-[70%] rounded-t-full rounded-b-[40%]"
          style={{ backgroundColor: character === 'sofia' ? '#8B4513' : '#4a2511' }} // Hair
        />

        {/* Eyes */}
        <div className="absolute top-1/2 w-full flex justify-center gap-1.5 z-10">
          <div className="w-1.5 h-1.5 bg-slate-800 rounded-full" />
          <div className="w-1.5 h-1.5 bg-slate-800 rounded-full" />
        </div>
        {/* Mouth */}
        <div className="absolute top-[65%] w-3 h-1.5 bg-pink-400 rounded-b-full z-10" />
      </div>

      {/* Accessories */}
      {accessory === 'headphones' && (
        <div className="absolute top-[20%] w-[65%] h-[45%] border-[3px] border-[#9370DB] rounded-t-[40px] pointer-events-none z-20">
          <div className="absolute -bottom-1 -left-2 w-3 h-4 bg-[#FF69B4] rounded-full" />
          <div className="absolute -bottom-1 -right-2 w-3 h-4 bg-[#FF69B4] rounded-full" />
        </div>
      )}

      {accessory === 'glasses' && (
        <div className="absolute top-[47%] w-[55%] flex justify-between px-1 pointer-events-none z-20">
          <div className="w-3 h-3 border-[2px] border-slate-700 rounded-full" />
          <div className="w-3 h-3 border-[2px] border-slate-700 rounded-full" />
          <div className="absolute left-[40%] top-1 w-2 h-0.5 bg-slate-700" />
        </div>
      )}

      {accessory === 'cap' && (
        <div className="absolute top-[18%] w-[60%] h-[20%] pointer-events-none z-20">
          <div className="w-full h-full bg-[#FFD700] rounded-t-full" />
          <div className="absolute -left-1 bottom-0 w-[120%] h-1.5 bg-[#FFD700] rounded-full" />
        </div>
      )}

      {accessory === 'cape' && (
        <div className="absolute w-[80%] h-full top-[50%] bg-[#FF4747] rounded-full pointer-events-none z-0 opacity-80" />
      )}
    </div>
  );
};
