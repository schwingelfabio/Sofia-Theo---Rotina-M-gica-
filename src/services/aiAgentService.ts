import { GoogleGenAI } from "@google/genai";

// Inicialização segura do serviço de agente
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type AgentRole = 'teacher' | 'doctor';

export const agentPrompts: Record<AgentRole, string> = {
  teacher: `Você é o Professor IA do Conecta-Verse. Seu objetivo é inclusão pedagógica. 
            Você percebe que a criança está no ambiente escolar (3D). 
            Se a telemetria mostrar baixa precisão motora, adapte a atividade para algo mais simples. 
            Seja empático, paciente e use reforço positivo.`,
  doctor: `Você é o Médico IA do Conecta-Verse. Protocolo TEA especializado. 
           Analise os dados de telemetria da criança. Se o avatar estiver parado por muito tempo 
           em um ambiente, avalie como possível crise sensorial. Sugira intervenções suaves.`
};

export async function interactWithAgent(role: AgentRole, context: any) {
  const model = ai.getGenerativeModel({ model: "gemini-1.5-pro" });
  
  const prompt = `${agentPrompts[role]}
  
  Contexto do usuário (telemetria):
  ${JSON.stringify(context)}
  
  Responda com uma intenção de ação (para o motor do jogo) e uma mensagem empática.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
