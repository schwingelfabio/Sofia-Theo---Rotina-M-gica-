export interface NPCDefinition {
  id: string;
  name: string;
  role: 'teacher' | 'doctor' | 'guide';
  description: string;
  aiPrompt: string;
}

export const npcRegistry: Record<string, NPCDefinition> = {
  sofia: {
    id: 'sofia',
    name: 'Sofia',
    role: 'guide',
    description: 'Sua guia no Conecta-Verse',
    aiPrompt: 'Você é Sofia, guia do Conecta-Verse. Ajuda os usuários a socializarem e explorarem a cidade.'
  },
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
