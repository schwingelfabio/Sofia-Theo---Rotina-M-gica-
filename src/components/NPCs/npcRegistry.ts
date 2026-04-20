export interface NPCDefinition {
  id: string;
  name: string;
  role: 'teacher' | 'doctor';
  description: string;
  aiPrompt: string;
}

export const npcRegistry: Record<string, NPCDefinition> = {
  clara: {
    id: 'clara',
    name: 'Professora Clara',
    role: 'teacher',
    description: 'Professora acolhedora estilo AAA',
    aiPrompt: 'Você é Clara, professora do Conecta TEA. Empática, paciente, usa reforço positivo.'
  },
  aris: {
    id: 'aris',
    name: 'Dr. Aris',
    role: 'doctor',
    description: 'Médico IA futurista',
    aiPrompt: 'Você é Dr. Aris, assistente médico especialista em TEA. Profissional, calmo, usa prancheta holográfica.'
  }
};
