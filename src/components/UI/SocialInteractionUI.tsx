import React from 'react';
import { Html } from '@react-three/drei';
import { useWorldStore } from '../../state/useWorldStore';
import { db } from '../../lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useAuth } from '../../state/AuthContext';

interface SocialInteractionUIProps {
    user: any;
}

export const SocialInteractionUI: React.FC<SocialInteractionUIProps> = ({ user }) => {
    const { isSocialModeActive, setSocialMode, socialInteractionStartTime, addMagicHearts, setCooperating } = useWorldStore();

    if (!isSocialModeActive) return null;

    const handleChoice = async (label: string, isCorrect: boolean) => {
        const endTime = Date.now();
        const responseTime = socialInteractionStartTime ? (endTime - socialInteractionStartTime) / 1000 : 0;

        // Registro Telemetria Silencioso
        if (user) {
            await addDoc(collection(db, 'users', user.uid, 'social_reports'), {
                timestamp: new Date(),
                responseTimeSeconds: responseTime,
                choiceSelected: label,
                interactionType: 'Sofia_Meeting'
            });
        }

        if (isCorrect) {
            addMagicHearts(10);
            // Inicia cooperação siga o líder
            setCooperating(true);
            alert("✨ +10 Corações Mágicos! Sofia aceitou brincar!");
        }

        setSocialMode(false);
    };

    return (
        <group position={[0, 2.5, 0]}>
            <Html center>
                <div className="flex gap-6 p-6 bg-black/40 backdrop-blur-2xl rounded-full shadow-[0_0_50px_rgba(139,92,246,0.5)] border border-white/20 animate-pulse-slow">
                    <button 
                        onClick={() => handleChoice('Oi', true)}
                        className="flex flex-col items-center hover:scale-125 transition-transform p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10"
                    >
                        <span className="text-5xl drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">👋</span>
                        <span className="text-[9px] font-black text-white/50 tracking-widest mt-1">HEAL</span>
                    </button>
                    
                    <button 
                        onClick={() => handleChoice('Coracao', false)}
                        className="flex flex-col items-center hover:scale-125 transition-transform p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10"
                    >
                        <span className="text-5xl drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">❤️</span>
                        <span className="text-[9px] font-black text-white/50 tracking-widest mt-1">LOVE</span>
                    </button>

                    <button 
                        onClick={() => handleChoice('Troca', false)}
                        className="flex flex-col items-center hover:scale-125 transition-transform p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10"
                    >
                        <span className="text-5xl drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">🤝</span>
                        <span className="text-[9px] font-black text-white/50 tracking-widest mt-1">CONNECT</span>
                    </button>
                </div>
            </Html>
        </group>
    );
};
