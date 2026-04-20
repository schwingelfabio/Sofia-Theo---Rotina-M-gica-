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
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full max-w-md px-6">
            {/* Step 1: Wake Up */}
            {currentMissionStep === 'wake_up' && (
                <div className="bg-black/40 backdrop-blur-3xl p-8 rounded-[40px] shadow-[0_0_80px_rgba(255,255,255,0.1)] border border-white/20 pointer-events-auto animate-float text-white">
                    <h2 className="text-2xl font-black mb-2 tracking-widest uppercase">PROTOCOLO: ALVORADA</h2>
                    <p className="text-xs text-white/60 mb-8 uppercase tracking-widest">Objetivo: Regulação Auditiva</p>
                    {isAlarmPlaying && (
                        <button 
                            onClick={() => {
                                toggleAlarm(false);
                                addMagicHearts(5);
                                setMissionStep('get_dressed');
                            }}
                            className="w-full bg-white/10 hover:bg-white/20 border border-white/30 py-5 rounded-2xl font-black transition-all active:scale-95 text-sm tracking-[0.2em] shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        >
                            TERMINAR FREQUÊNCIA
                        </button>
                    )}
                </div>
            )}

            {/* Step 2: Get Dressed */}
            {currentMissionStep === 'get_dressed' && (
                <div className="bg-black/40 backdrop-blur-3xl p-8 rounded-[40px] shadow-[0_0_80px_rgba(255,255,255,0.1)] border border-white/20 pointer-events-auto animate-float text-white">
                    <h2 className="text-2xl font-black mb-2 tracking-widest uppercase">MÓDULO: VESTUÁRIO</h2>
                    <p className="text-xs text-white/60 mb-8 uppercase tracking-widest">Selecione Textura Sensorial</p>
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { id: 'cotton', emoji: '☁️', label: 'SOFT' },
                            { id: 'wool', emoji: '🧶', label: 'WARM' },
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
                                className="bg-white/5 hover:bg-white/20 border border-white/10 p-5 rounded-3xl flex flex-col items-center gap-3 transition-all hover:-translate-y-2"
                            >
                                <span className="text-4xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{item.emoji}</span>
                                <span className="text-[9px] font-black tracking-widest">{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Step 3: Brush Teeth */}
            {currentMissionStep === 'brush_teeth' && (
                <div className="bg-black/40 backdrop-blur-3xl p-8 rounded-[40px] shadow-[0_0_80px_rgba(255,255,255,0.1)] border border-white/20 pointer-events-auto animate-float text-white text-center">
                    <h2 className="text-2xl font-black mb-2 tracking-widest uppercase">LIMPEZA QUÂNTICA</h2>
                    <p className="text-xs text-white/60 mb-8 uppercase tracking-widest">Ativando Brilho do Sorriso</p>
                    <div className="flex justify-center gap-2 mb-8">
                        {'⚡'.repeat(teethCleanedCount)}{'◌'.repeat(5 - teethCleanedCount)}
                    </div>
                    {teethCleanedCount < 5 ? (
                        <button 
                            onClick={() => cleanTooth()}
                            className="w-full bg-cyan-400/20 hover:bg-cyan-400/40 border border-cyan-400 py-5 rounded-2xl font-black transition-all active:scale-95 text-cyan-400 tracking-[0.2em] shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                        >
                            SINCRONIZAÇÃO
                        </button>
                    ) : (
                        <div className="space-y-6">
                            <p className="font-black text-cyan-400 text-sm tracking-widest animate-pulse">INTEGRIDADE 100%</p>
                            <button 
                                onClick={() => {
                                    setMissionStep('completed');
                                    setZone('city');
                                }}
                                className="w-full bg-white text-black py-5 rounded-2xl font-black tracking-widest hover:scale-105 transition-transform"
                            >
                                ENTRAR NA CIDADE 🚀
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Final feedback */}
            {currentMissionStep === 'completed' && (
                <div className="bg-white/90 backdrop-blur-2xl text-black p-10 rounded-[50px] shadow-[0_0_100px_rgba(255,255,255,0.4)] pointer-events-auto text-center border-8 border-white animate-scale-in">
                    <h2 className="text-4xl font-black mb-4 tracking-tighter">MISSÃO COMPLETA</h2>
                    <p className="text-sm font-bold opacity-60 uppercase tracking-widest">Autonomia Máxima Detectada</p>
                    <button 
                        onClick={() => setMissionStep('none')}
                        className="mt-10 bg-black text-white px-12 py-4 rounded-full font-black tracking-[0.2em] hover:scale-110 transition-transform shadow-2xl"
                    >
                        EXPLORAR VORTEX
                    </button>
                </div>
            )}
        </div>
    );
};
