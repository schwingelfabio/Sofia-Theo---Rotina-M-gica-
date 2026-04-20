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
        }

        setSocialMode(false);
    };

    return (
        <group position={[0, 2.5, 0]}>
            <Html center transform occlude distanceFactor={8}>
                <div className="flex gap-8 p-10 bg-white/5 backdrop-blur-2xl rounded-[60px] border border-teal-400/20 animate-pulse-calm">
                    <button 
                        onClick={() => handleChoice('Oi', true)}
                        className="flex flex-col items-center hover:scale-125 transition-transform p-5 bg-teal-400/10 hover:bg-teal-400/30 rounded-full border border-teal-400/30"
                    >
                        <span className="text-6xl">👋</span>
                        <span className="text-[10px] font-black text-teal-200 tracking-[0.2em] mt-2">HELLO</span>
                    </button>
                    
                    <button 
                        onClick={() => handleChoice('Coracao', false)}
                        className="flex flex-col items-center hover:scale-125 transition-transform p-5 bg-white/5 hover:bg-white/10 rounded-full border border-white/10"
                    >
                        <span className="text-6xl">❤️</span>
                        <span className="text-[10px] font-bold text-white/40 tracking-[0.2em] mt-2">EMPATHY</span>
                    </button>

                    <button 
                        onClick={() => handleChoice('Troca', false)}
                        className="flex flex-col items-center hover:scale-125 transition-transform p-5 bg-white/5 hover:bg-white/10 rounded-full border border-white/10"
                    >
                        <span className="text-6xl">🤝</span>
                        <span className="text-[10px] font-bold text-white/40 tracking-[0.2em] mt-2">SHARE</span>
                    </button>
                </div>
            </Html>
        </group>
    );
};
