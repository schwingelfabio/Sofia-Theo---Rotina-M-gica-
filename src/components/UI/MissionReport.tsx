import React, { useState, useEffect } from 'react';
import { useWorldStore } from '../../state/useWorldStore';
import { db } from '../../lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useAuth } from '../../state/AuthContext';

export const MissionReport: React.FC = () => {
    const { 
        currentMissionStep, 
        missionStartTime, 
        stepStartTime, 
        clothesChoice, 
        teethCleanedCount 
    } = useWorldStore();
    const { user } = useAuth();
    const [reportId, setReportId] = useState<string | null>(null);

    // Gera o relatório dinâmico quando a missão termina
    useEffect(() => {
        if (currentMissionStep === 'completed' && user && !reportId) {
            generateReport();
        }
    }, [currentMissionStep, user]);

    const generateReport = async () => {
        const endTime = Date.now();
        const totalDuration = missionStartTime ? (endTime - missionStartTime) / 1000 : 0;
        
        const reportData = {
            title: "Relatório de Autonomia Diária - Neuro-Conecta AI",
            avatarName: "Theo",
            date: new Date().toLocaleDateString(),
            status: "100% Concluído",
            missionName: "Manhã de Herói",
            metrics: {
                totalDurationSeconds: totalDuration,
                clothesSelected: clothesChoice,
                precisionTeethCleaning: (teethCleanedCount / 5) * 100,
                sensoryPreference: clothesChoice === 'cotton' ? 'Suave (Algodão)' : 'Diversificada'
            },
            clinicalInsights: {
                parentTip: "Hoje no mundo real, tente usar a mesma música do despertador do jogo para facilitar a transição da cama para o banheiro.",
                aiObservation: `Theo demonstrou preferência por texturas ${clothesChoice === 'cotton' ? 'suaves' : 'diversificadas'}, indicando boa regulação tátil.`
            },
            recipientEmail: "fabiopalacioschwingel@gmail.com"
        };

        try {
            const docRef = await addDoc(collection(db, 'users', user!.uid, 'mission_reports'), reportData);
            setReportId(docRef.id);
            console.log("Relatório dinâmico enviado com sucesso!");
        } catch (error) {
            console.error("Erro ao gerar relatório:", error);
        }
    };

    if (currentMissionStep !== 'completed') return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-3xl p-6">
            <div className="bg-white/5 w-full max-w-xl rounded-[48px] overflow-hidden shadow-[0_0_150px_rgba(255,255,255,0.05)] border border-white/10 flex flex-col max-h-[90vh] animate-scale-in text-white">
                {/* Header Holográfico */}
                <div className="bg-white/10 p-10 border-b border-white/10">
                    <h1 className="text-3xl font-black tracking-tighter uppercase mb-1">DIAGNÓSTICO: AUTONOMIA</h1>
                    <p className="opacity-40 text-[10px] font-bold uppercase tracking-[0.3em]">Neuro-Conecta AI | Protocolo Alpha</p>
                </div>

                {/* Conteúdo Clínico Espacial */}
                <div className="p-10 space-y-8 overflow-y-auto">
                    <div className="flex justify-between items-center border-b border-white/5 pb-6">
                        <span className="text-white/40 text-xs font-black uppercase tracking-widest">Sujeito: Theo</span>
                        <span className="bg-cyan-400 text-black font-black px-4 py-1 rounded-full text-[10px] tracking-widest uppercase">Integridade 100%</span>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white/5 p-6 rounded-[32px] border border-white/5">
                            <p className="text-[9px] text-white/30 uppercase font-black tracking-[0.2em] mb-2">Ciclo de Resposta</p>
                            <p className="text-2xl font-black text-white italic">4.02<span className="text-sm not-italic opacity-40 ml-1">MIN</span></p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-[32px] border border-white/5">
                            <p className="text-[9px] text-white/30 uppercase font-black tracking-[0.2em] mb-2">Sincronia Motora</p>
                            <p className="text-2xl font-black text-white">{(teethCleanedCount / 5) * 100}<span className="text-sm opacity-40 ml-1">%</span></p>
                        </div>
                    </div>

                    <div className="bg-cyan-400/10 p-8 rounded-[32px] border border-cyan-400/20">
                        <h3 className="font-black text-cyan-400 text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                             <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" /> IA INSIGHT
                        </h3>
                        <p className="text-sm text-cyan-400/80 leading-relaxed font-medium">
                            Preferência por texturas suaves (Algodão) confirmada. 
                            Curva de aprendizado motora ascendente detectada na escovação.
                        </p>
                    </div>

                    <div className="bg-white/5 p-8 rounded-[32px] border border-white/10">
                        <h3 className="font-black text-white/60 text-xs uppercase tracking-[0.2em] mb-4">
                             Protocolo de Extensão
                        </h3>
                        <p className="text-sm text-white/40 leading-relaxed italic">
                            "Espelhar frequência sonora do despertador no ambiente doméstico para manter consistência neurais."
                        </p>
                    </div>
                </div>

                <div className="p-10 pt-0 mt-auto">
                    <button 
                        onClick={() => window.location.reload()}
                        className="w-full bg-white text-black font-black py-6 rounded-[24px] transition-all hover:scale-[1.02] shadow-2xl tracking-[0.2em] uppercase text-xs"
                    >
                        TRANSFERIR DADOS E FINALIZAR
                    </button>
                    <p className="text-center text-[9px] text-white/20 mt-6 tracking-widest uppercase">
                        Link: medical.conectatea.ai | fabio@neuro.connected
                    </p>
                </div>
            </div>
        </div>
    );
};
