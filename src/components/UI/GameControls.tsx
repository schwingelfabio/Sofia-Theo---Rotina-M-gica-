import React from 'react';
import { Circle, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Hand, Zap } from 'lucide-react';
import { useJoystickStore } from '../../state/useJoystickStore';

export const GameControls: React.FC = () => {
    const { setMoveVector, setAction } = useJoystickStore();

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Joystick (simplified) */}
      <div className="absolute bottom-8 left-8 w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full pointer-events-auto border-4 border-white/40 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-1">
          <div /> <button onTouchStart={() => setMoveVector({x:0, z:-1})} onTouchEnd={() => setMoveVector({x:0, z:0})}><ArrowUp className="text-white" size={32} /></button> <div />
          <button onTouchStart={() => setMoveVector({x:-1, z:0})} onTouchEnd={() => setMoveVector({x:0, z:0})}><ArrowLeft className="text-white" size={32} /></button> <div /> <button onTouchStart={() => setMoveVector({x:1, z:0})} onTouchEnd={() => setMoveVector({x:0, z:0})}><ArrowRight className="text-white" size={32} /></button>
          <div /> <button onTouchStart={() => setMoveVector({x:0, z:1})} onTouchEnd={() => setMoveVector({x:0, z:0})}><ArrowDown className="text-white" size={32} /></button> <div />
        </div>
      </div>

      {/* Botões de Interação (Direita) */}
      <div className="absolute bottom-8 right-8 flex gap-4 pointer-events-auto">
        <button className="w-20 h-20 bg-[#FF69B4]/80 backdrop-blur-sm rounded-full border-4 border-white/50 flex flex-col items-center justify-center text-white shadow-xl">
          <Hand size={32} />
          <span className="font-black text-xs uppercase">Pegar</span>
        </button>
        <button className="w-20 h-20 bg-[#008080]/80 backdrop-blur-sm rounded-full border-4 border-white/50 flex flex-col items-center justify-center text-white shadow-xl">
          <Zap size={32} />
          <span className="font-black text-xs uppercase">Pular</span>
        </button>
      </div>
    </div>
  );
};
