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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-6">
            <div className="bg-white w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
                {/* Header Estilizado */}
                <div className="bg-purple-600 p-8 text-white">
                    <h1 className="text-2xl font-bold">Relatório de Evolução</h1>
                    <p className="opacity-80 text-sm">Neuro-Conecta AI | Missão 01</p>
                </div>

                {/* Conteúdo Clínico */}
                <div className="p-8 space-y-6 overflow-y-auto">
                    <div className="flex justify-between items-center border-b pb-4">
                        <span className="text-gray-500 font-medium">Avatar: Theo</span>
                        <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-xs">100% Concluído</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-2xl">
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Tempo Total</p>
                            <p className="text-lg font-bold text-gray-800">4:02 min</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-2xl">
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Habilidade Motora</p>
                            <p className="text-lg font-bold text-gray-800">{(teethCleanedCount / 5) * 100}% Precisão</p>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-400">
                        <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                             🧠 Insight da IA
                        </h3>
                        <p className="text-sm text-blue-700 leading-relaxed">
                            O Theo demonstrou preferência por texturas suaves (Algodão), 
                            evitando sobrecarca tátil. Notamos uma melhora na coordenação olho-mão.
                        </p>
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-2xl border-l-4 border-yellow-400">
                        <h3 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                             👥 Orientação Parental
                        </h3>
                        <p className="text-sm text-yellow-700 leading-relaxed italic">
                            "Tente usar a mesma música do despertador do jogo no mundo real 
                            para facilitar a transição."
                        </p>
                    </div>
                </div>

                <div className="p-8 pt-0 mt-auto">
                    <button 
                        onClick={() => window.location.reload()}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-purple-200"
                    >
                        FECHAR E SALVAR RELATÓRIO
                    </button>
                    <p className="text-center text-[10px] text-gray-400 mt-4">
                        Enviado para: fabiopalacioschwingel@gmail.com
                    </p>
                </div>
            </div>
        </div>
    );
};
