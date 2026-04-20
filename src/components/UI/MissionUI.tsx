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
        <Html transform occlude distanceFactor={10} position={[0, 0, 0]} rotation={[0, 0, 0]}>
            <div className="w-[500px] pointer-events-auto select-none">
                {/* Step 1: Wake Up */}
                {currentMissionStep === 'wake_up' && (
                    <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[60px] border border-cyan-400/20 text-center animate-pulse-calm">
                        <div className="w-20 h-20 bg-cyan-400/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                            <span className="text-4xl">⏰</span>
                        </div>
                        <h2 className="text-3xl font-black mb-2 text-cyan-400 tracking-tighter uppercase">PORTAL DE DESPERTAR</h2>
                        <p className="text-sm text-cyan-200/60 mb-10 uppercase tracking-[0.3em]">Sincronização Auditiva</p>
                        {isAlarmPlaying && (
                            <button 
                                onClick={() => {
                                    toggleAlarm(false);
                                    addMagicHearts(5);
                                    setMissionStep('get_dressed');
                                }}
                                className="w-full bg-cyan-400/10 hover:bg-cyan-400/30 border border-cyan-400/40 py-6 rounded-3xl font-black transition-all active:scale-95 text-white tracking-widest text-lg"
                            >
                                ESTABILIZAR FOCO
                            </button>
                        )}
                    </div>
                )}

                {/* Step 2: Get Dressed */}
                {currentMissionStep === 'get_dressed' && (
                    <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[60px] border border-teal-400/20 animate-float">
                        <h2 className="text-3xl font-black mb-2 text-teal-400 tracking-tighter uppercase">MATRIZ TÁTIL</h2>
                        <p className="text-sm text-teal-200/60 mb-10 uppercase tracking-[0.3em]">Seleção de Proteção</p>
                        <div className="grid grid-cols-3 gap-6">
                            {[
                                { id: 'cotton', emoji: '☁️', label: 'SUAVE' },
                                { id: 'wool', emoji: '🧶', label: 'TÉRMICO' },
                                { id: 'mesh', emoji: '🕸️', label: 'FLEX' }
                            ].map(item => (
                                <button 
                                    key={item.id}
                                    onClick={() => {
                                        setClothesChoice(item.id as any);
                                        addMagicHearts(10);
                                        setMissionStep('brush_teeth');
                                        setZone('bathroom');
                                    }}
                                    className="bg-white/5 hover:bg-white/20 border border-white/10 p-6 rounded-[32px] flex flex-col items-center gap-4 transition-all hover:-translate-y-4"
                                >
                                    <span className="text-5xl">{item.emoji}</span>
                                    <span className="text-[10px] font-bold text-white tracking-widest">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 3: Brush Teeth */}
                {currentMissionStep === 'brush_teeth' && (
                    <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[60px] border border-cyan-400/20 text-center animate-pulse-calm">
                        <h2 className="text-3xl font-black mb-2 text-cyan-400 tracking-tighter uppercase">REPARAÇÃO BIO</h2>
                        <p className="text-sm text-cyan-200/60 mb-10 uppercase tracking-[0.3em]">Integridade Estomatológica</p>
                        <div className="flex justify-center gap-3 mb-10">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className={`w-8 h-8 rounded-lg border-2 ${i < teethCleanedCount ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'border-white/20'}`} />
                            ))}
                        </div>
                        {teethCleanedCount < 5 ? (
                            <button 
                                onClick={() => cleanTooth()}
                                className="w-full bg-cyan-400/20 hover:bg-cyan-400/40 border border-cyan-400 py-6 rounded-3xl font-black transition-all active:scale-95 text-cyan-400 tracking-widest text-lg"
                            >
                                PULSAR LIMPEZA
                            </button>
                        ) : (
                            <div className="space-y-8">
                                <p className="font-black text-white text-xl tracking-tighter animate-pulse">OBJETIVO ALCANÇADO</p>
                                <button 
                                    onClick={() => {
                                        setMissionStep('completed');
                                        setZone('city');
                                    }}
                                    className="w-full bg-cyan-400 text-black py-6 rounded-3xl font-black tracking-widest text-lg hover:scale-105 transition-transform"
                                >
                                    SINCRONIZAR CIDADE 🚀
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Html>
    );
};
