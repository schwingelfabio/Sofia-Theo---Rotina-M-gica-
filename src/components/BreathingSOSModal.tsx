import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, X } from 'lucide-react';
import { useGame } from '../state/GameContext';

export const BreathingSOSModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [phase, setPhase] = useState<'breathe_in' | 'hold' | 'breathe_out'>('breathe_in');
  const { language } = useGame();
  
  const isPt = language === 'pt';

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const cycle = () => {
      setPhase('breathe_in');
      timer = setTimeout(() => {
        setPhase('hold');
        timer = setTimeout(() => {
          setPhase('breathe_out');
          timer = setTimeout(() => {
            cycle();
          }, 4000); // 4s out
        }, 2000); // 2s hold
      }, 4000); // 4s in
    };

    cycle();

    return () => clearTimeout(timer);
  }, []);

  const getInstructions = () => {
    switch (phase) {
      case 'breathe_in': return isPt ? 'Inspire pelo nariz...' : 'Breathe in through your nose...';
      case 'hold': return isPt ? 'Segure um pouquinho...' : 'Hold for a little bit...';
      case 'breathe_out': return isPt ? 'Solte pela boca...' : 'Breathe out through your mouth...';
    }
  };

  const getScale = () => {
    switch (phase) {
      case 'breathe_in': return 1.5;
      case 'hold': return 1.5;
      case 'breathe_out': return 1;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#FF4747]/95 backdrop-blur-md flex flex-col items-center justify-center p-6"
    >
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 w-14 h-14 bg-white/20 hover:bg-white/30 rounded-2xl border-2 border-white/20 flex items-center justify-center text-white transition-all shadow-md"
      >
        <X size={28} />
      </button>

      <h2 className="text-3xl md:text-5xl font-black text-white mb-16 text-center drop-shadow-sm tracking-tight leading-tight">
        {isPt ? 'Vamos respirar' : "Let's breathe"} <br/> {isPt ? 'com a Sofia' : 'with Sofia'}
      </h2>

      <div className="relative w-72 h-72 flex items-center justify-center mb-16">
        <motion.div
          animate={{ scale: getScale() }}
          transition={{ duration: phase === 'hold' ? 2 : 4, ease: "easeInOut" }}
          className="absolute w-56 h-56 bg-white/20 rounded-full"
        />
        <motion.div
          animate={{ scale: getScale() * 0.8 }}
          transition={{ duration: phase === 'hold' ? 2 : 4, ease: "easeInOut" }}
          className="absolute w-56 h-56 bg-white/30 rounded-full shadow-inner"
        />
        <div className="absolute w-28 h-28 bg-white rounded-[40px] flex items-center justify-center shadow-xl border-4 border-white/80">
          <Heart size={56} className="text-[#FF4747]" fill="currentColor" />
        </div>
      </div>

      <motion.p
        key={phase}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-3xl font-black text-white tracking-wide"
      >
        {getInstructions()}
      </motion.p>

      <button 
        onClick={onClose}
        className="mt-20 bg-white text-[#FF4747] px-10 py-5 rounded-[24px] font-black text-xl hover:bg-red-50 hover:scale-105 transition-all shadow-xl border-4 border-white"
      >
        {isPt ? 'Estou me sentindo melhor' : "I'm feeling better"}
      </button>
    </motion.div>
  );
};
