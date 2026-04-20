import React from 'react';
import { motion } from 'motion/react';
import { useWorldStore } from '../../state/useWorldStore';

export const TransitionOverlay: React.FC = () => {
  const currentZone = useWorldStore((state) => state.currentZone);

  return (
    <motion.div
      key={currentZone}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 bg-black z-50 pointer-events-none"
    />
  );
};
