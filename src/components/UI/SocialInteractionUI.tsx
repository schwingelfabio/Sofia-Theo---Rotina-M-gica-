import React from 'react';
import { Html } from '@react-three/drei';
import { useWorldStore } from '../../state/useWorldStore';
import { db } from '../../lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useAuth } from '../../state/AuthContext';

export const SocialInteractionUI: React.FC = () => {
    const { isSocialModeActive, setSocialMode, socialInteractionStartTime, addMagicHearts, setCooperating } = useWorldStore();
    const { user } = useAuth();

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
                <div className="flex gap-4 p-4 bg-white/90 backdrop-blur rounded-2xl shadow-2xl border-4 border-purple-200 animate-bounce-in">
                    <button 
                        onClick={() => handleChoice('Oi', true)}
                        className="flex flex-col items-center hover:scale-110 transition-transform p-2 bg-blue-50 rounded-xl"
                    >
                        <span className="text-4xl">👋</span>
                        <span className="text-[10px] font-bold text-blue-600">SAUDAÇÃO</span>
                    </button>
                    
                    <button 
                        onClick={() => handleChoice('Coracao', false)}
                        className="flex flex-col items-center hover:scale-110 transition-transform p-2 bg-pink-50 rounded-xl"
                    >
                        <span className="text-4xl">❤️</span>
                        <span className="text-[10px] font-bold text-pink-600">ELOGIO</span>
                    </button>

                    <button 
                        onClick={() => handleChoice('Troca', false)}
                        className="flex flex-col items-center hover:scale-110 transition-transform p-2 bg-green-50 rounded-xl"
                    >
                        <span className="text-4xl">🤝</span>
                        <span className="text-[10px] font-bold text-green-600">TROCAR</span>
                    </button>
                </div>
                <div className="mt-2 text-center text-xs font-bold text-purple-800 bg-white/50 rounded-full px-2">
                    SOCIAL SKILLS MODE
                </div>
            </Html>
        </group>
    );
};
