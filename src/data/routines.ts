export interface RoutineTask {
  id: string;
  title: { pt: string; en: string };
  worldId: string;
  iconType: 'sun' | 'toothbrush' | 'shirt' | 'backpack' | 'book' | 'users' | 'smile' | 'hand' | 'puzzle';
  reward: number;
}

export const ROUTINES: Record<string, RoutineTask[]> = {
  home: [
    { id: 'h1', title: { pt: 'Acordar', en: 'Wake Up' }, worldId: 'home', iconType: 'sun', reward: 5 },
    { id: 'h2', title: { pt: 'Escovar Dentes', en: 'Brush Teeth' }, worldId: 'home', iconType: 'toothbrush', reward: 10 },
    { id: 'h3', title: { pt: 'Vestir Roupa', en: 'Get Dressed' }, worldId: 'home', iconType: 'shirt', reward: 10 },
  ],
  school: [
    { id: 's1', title: { pt: 'Guardar Mochila', en: 'Put Backpack Away' }, worldId: 'school', iconType: 'backpack', reward: 5 },
    { id: 's2', title: { pt: 'Hora de Aprender', en: 'Learning Time' }, worldId: 'school', iconType: 'book', reward: 10 },
    { id: 's3', title: { pt: 'Intervalo', en: 'Recess' }, worldId: 'school', iconType: 'smile', reward: 5 },
  ],
  park: [
    { id: 'p1', title: { pt: 'Encontrar Amigos', en: 'Meet Friends' }, worldId: 'park', iconType: 'users', reward: 5 },
    { id: 'p2', title: { pt: 'Minha Vez de Brincar', en: 'My Turn to Play' }, worldId: 'park', iconType: 'hand', reward: 10 },
    { id: 'p3', title: { pt: 'Quebra-cabeça Juntos', en: 'Puzzle Together' }, worldId: 'park', iconType: 'puzzle', reward: 15 },
  ]
};

export const WORLD_TITLES: Record<string, { pt: string; en: string }> = {
  home: { pt: 'Casa Mágica', en: 'Magic Home' },
  school: { pt: 'Escola Amiga', en: 'Friendly School' },
  park: { pt: 'Parque da Conexão', en: 'Connection Park' }
};

export const WORLD_COLORS: Record<string, string> = {
  home: 'text-pink-600 dark:text-pink-400',
  school: 'text-teal-600 dark:text-teal-400',
  park: 'text-indigo-600 dark:text-indigo-400'
};
