import React from 'react';
import { Html } from '@react-three/drei';
import { useWorldStore } from '../../state/useWorldStore';

export const MissionUI: React.FC = () => {
    const { 
        currentMissionStep, 
        isAlarmPlaying, 
        toggleAlarm, 
        setMissionStep, 
        addMagicHearts,
        setClothesChoice,
        teethCleanedCount,
        cleanTooth,
        setZone
    } = useWorldStore();

    if (currentMissionStep === 'none') return null;

    return (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            {/* Step 1: Wake Up */}
            {currentMissionStep === 'wake_up' && (
                <div className="bg-white/90 p-6 rounded-3xl shadow-2xl border-4 border-yellow-400 pointer-events-auto animate-bounce-in">
                    <h2 className="text-xl font-bold text-yellow-700 mb-4">☀️ Manhã de Herói</h2>
                    <p className="text-sm mb-4">Tarefa: Clique no despertador musical!</p>
                    {isAlarmPlaying && (
                        <button 
                            onClick={() => {
                                toggleAlarm(false);
                                addMagicHearts(5);
                                setMissionStep('get_dressed');
                            }}
                            className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-6 py-2 rounded-full font-bold flex items-center gap-2 transition-all active:scale-95"
                        >
                            <span className="text-2xl">⏰</span> PARAR DESPERTADOR
                        </button>
                    )}
                </div>
            )}

            {/* Step 2: Get Dressed */}
            {currentMissionStep === 'get_dressed' && (
                <div className="bg-white/90 p-6 rounded-3xl shadow-2xl border-4 border-blue-400 pointer-events-auto animate-bounce-in">
                    <h2 className="text-xl font-bold text-blue-700 mb-4">👕 Hora de Vestir</h2>
                    <p className="text-sm mb-4">Escolha a roupa mais confortável para hoje:</p>
                    <div className="flex gap-4">
                        {[
                            { id: 'cotton', emoji: '👕', label: 'Algodão', desc: 'Frequinho' },
                            { id: 'wool', emoji: '🧶', label: 'Lã', desc: 'Quentinho' },
                            { id: 'mesh', emoji: '🩳', label: 'Malha', desc: 'Elástico' }
                        ].map(item => (
                            <button 
                                key={item.id}
                                onClick={() => {
                                    setClothesChoice(item.id as any);
                                    addMagicHearts(10);
                                    setMissionStep('brush_teeth');
                                    setZone('bathroom');
                                }}
                                className="bg-blue-100 hover:bg-blue-200 p-4 rounded-2xl flex flex-col items-center gap-1 transition-all active:scale-90"
                            >
                                <span className="text-3xl">{item.emoji}</span>
                                <span className="text-[10px] font-bold">{item.label}</span>
                                <span className="text-[10px] opacity-60">{item.desc}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Step 3: Brush Teeth */}
            {currentMissionStep === 'brush_teeth' && (
                <div className="bg-white/90 p-6 rounded-3xl shadow-2xl border-4 border-teal-400 pointer-events-auto animate-bounce-in text-center">
                    <h2 className="text-xl font-bold text-teal-700 mb-4">🪥 Sorriso Brilhante</h2>
                    <p className="text-sm mb-4">Limpe as manchinhas nos dentes!</p>
                    <div className="text-4xl mb-4">
                        {'🦷'.repeat(5 - teethCleanedCount)}{'✨'.repeat(teethCleanedCount)}
                    </div>
                    {teethCleanedCount < 5 ? (
                        <button 
                            onClick={() => cleanTooth()}
                            className="bg-teal-400 hover:bg-teal-500 text-white px-8 py-3 rounded-full font-bold transition-all active:scale-95"
                        >
                            LIMPAR DENTE
                        </button>
                    ) : (
                        <div className="space-y-4">
                            <p className="font-bold text-teal-600 text-lg animate-pulse">✨ SORRISO BRILHANTE! ✨</p>
                            <button 
                                onClick={() => {
                                    setMissionStep('completed');
                                    setZone('city');
                                }}
                                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full font-bold"
                            >
                                IR PARA A CIDADE 🚀
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Final feedback */}
            {currentMissionStep === 'completed' && (
                <div className="bg-green-500 text-white p-6 rounded-3xl shadow-2xl pointer-events-auto text-center transform scale-110 border-4 border-white">
                    <h2 className="text-2xl font-bold mb-2">🎈 Missão Concluída!</h2>
                    <p className="text-sm opacity-90">Theo realizou a rotina matinal com 100% de autonomia!</p>
                    <button 
                        onClick={() => setMissionStep('none')}
                        className="mt-4 bg-white text-green-600 px-6 py-2 rounded-full font-bold"
                    >
                        EXPLORAR CIDADE
                    </button>
                </div>
            )}
        </div>
    );
};
