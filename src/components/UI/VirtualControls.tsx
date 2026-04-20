import React, { useState, useEffect } from 'react';

interface JoystickProps {
  onMove: (data: { x: number; y: number }) => void;
  onAction: () => void;
}

export const VirtualControls: React.FC<JoystickProps> = ({ onMove, onAction }) => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStart.x;
    const dy = touch.clientY - touchStart.y;
    
    // Limit joystick movement
    const dist = Math.sqrt(dx*dx + dy*dy);
    const maxDist = 50;
    const factor = dist > maxDist ? maxDist / dist : 1;
    
    const finalX = dx * factor;
    const finalY = dy * factor;
    
    setOffset({ x: finalX, y: finalY });
    onMove({ x: finalX / maxDist, y: -finalY / maxDist });
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
    setOffset({ x: 0, y: 0 });
    onMove({ x: 0, y: 0 });
  };

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-50">
      {/* Joystick Area */}
      <div 
        className="absolute bottom-12 left-12 w-32 h-32 bg-white/10 rounded-full border-2 border-white/20 pointer-events-auto flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="w-12 h-12 bg-white/40 rounded-full shadow-lg"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        />
      </div>

      {/* Action Button Area */}
      <div className="absolute bottom-12 right-12 pointer-events-auto">
        <button 
          onClick={onAction}
          className="w-20 h-20 bg-blue-500/80 rounded-full border-4 border-white shadow-2xl flex items-center justify-center active:scale-90 transition-transform"
        >
          <span className="text-white font-bold text-xl">AÇÃO</span>
        </button>
      </div>
    </div>
  );
};
