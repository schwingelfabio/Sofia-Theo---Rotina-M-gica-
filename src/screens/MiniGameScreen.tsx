import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGame } from '../state/GameContext';
import { ROUTINES, RoutineTask } from '../data/routines';
import { Star, Heart, UserCircle2 } from 'lucide-react';

interface MiniGameScreenProps {
  taskId: string;
  onComplete: () => void;
  onCancel: () => void;
}

export const MiniGameScreen: React.FC<MiniGameScreenProps> = ({ taskId, onComplete, onCancel }) => {
  const { completeRoutine, addHearts, language, activeCharacter } = useGame();
  const [progress, setProgress] = useState(0);
  const [isWiggling, setIsWiggling] = useState(false);

  const isPt = language === 'pt';

  // Find the task details
  let currentTask: RoutineTask | undefined;
  for (const world in ROUTINES) {
    const found = ROUTINES[world].find(t => t.id === taskId);
    if (found) currentTask = found;
  }

  if (!currentTask) return null;

  const totalSteps = 3;

  const handleStep = () => {
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 300);

    if (progress < totalSteps - 1) {
      setProgress(p => p + 1);
    } else {
      // Completed!
      setProgress(totalSteps);
      setTimeout(() => {
        completeRoutine(currentTask!.id);
        addHearts(currentTask!.reward);
        onComplete();
      }, 1500);
    }
  };

  const characterColors = {
    sofia: 'text-[#FF69B4] border-[#FF69B4] bg-pink-100 dark:bg-pink-900',
    theo: 'text-[#008080] border-[#008080] bg-teal-100 dark:bg-teal-900'
  };

  return (
    <div className="absolute inset-0 z-40 bg-white/90 dark:bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      
      <AnimatePresence mode="wait">
        {progress < totalSteps ? (
          <motion.div
            key="playing"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            className="flex flex-col items-center max-w-md w-full bg-[#F0F9F9] dark:bg-slate-800 rounded-[40px] shadow-2xl p-8 border-4 border-white dark:border-slate-700 relative"
          >
            <h2 className="text-3xl font-black text-[#008080] dark:text-[#4fd1d1] mb-2 tracking-tight">{isPt ? currentTask.title.pt : currentTask.title.en}</h2>
            <p className="text-[#2D3748]/70 dark:text-slate-300 font-bold pb-8">
              {isPt ? `Ajudando ${activeCharacter === 'sofia' ? 'a Sofia' : 'o Theo'} a focar!` : `Helping ${activeCharacter === 'sofia' ? 'Sofia' : 'Theo'} focus!`}
            </p>
            
            <div className="bg-white dark:bg-slate-900 w-full h-64 rounded-[32px] flex flex-col gap-4 items-center justify-center relative overflow-hidden shadow-inner border-2 border-[#008080]/10 dark:border-slate-700">
               {/* Character Avatar that animates */}
               <motion.div 
                 animate={isWiggling ? { rotate: [-10, 10, -10, 0], scale: [1, 1.1, 1] } : {}}
                 transition={{ duration: 0.3 }}
                 className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 shadow-md flex items-center justify-center ${characterColors[activeCharacter]}`}
               >
                 <UserCircle2 size={48} />
               </motion.div>

               <motion.button
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 onClick={handleStep}
                 className="w-20 h-20 bg-[#FF69B4] rounded-[24px] text-white flex items-center justify-center shadow-lg hover:bg-[#ff52a3]"
               >
                 <Star size={40} fill="currentColor" />
               </motion.button>
               <p className="absolute bottom-4 left-0 right-0 text-[#008080] dark:text-[#4fd1d1] font-bold text-xs uppercase tracking-widest opacity-80">
                 {isPt ? 'Toque na estrela!' : 'Tap the star!'} ({progress}/{totalSteps})
               </p>
            </div>

            <button 
              onClick={onCancel}
              className="mt-8 px-8 py-4 w-full rounded-2xl font-bold bg-white text-[#2D3748] border-2 border-slate-200 hover:bg-slate-50 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-600 transition-colors shadow-sm"
            >
              {isPt ? 'Voltar' : 'Back'}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center bg-white dark:bg-slate-800 rounded-[40px] shadow-2xl p-12 border-4 border-white dark:border-slate-700"
          >
            <div className="w-32 h-32 bg-[#FF69B4] rounded-full flex items-center justify-center text-white mb-8 shadow-xl shadow-[#FF69B4]/30 border-8 border-white dark:border-slate-700">
               <Heart size={64} fill="currentColor" />
            </div>
            <h2 className="text-4xl font-black text-[#008080] dark:text-[#4fd1d1] mb-3 tracking-tight">{isPt ? 'Muito Bem!' : 'Well Done!'}</h2>
            <p className="text-xl text-[#9370DB] dark:text-[#b193f0] font-bold">
              {isPt ? 'Você ganhou' : 'You earned'} {currentTask.reward} {isPt ? 'corações mágicos!' : 'magic hearts!'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
