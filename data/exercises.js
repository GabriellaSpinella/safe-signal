export const CATEGORIES = {
  respiracao: {
    title: 'Exercícios de respiração e relaxamento',
    level: 'Nível todos',
    duration: '10min',
    bg: '#DCEFE2',
    icon: 'respiracao',
    image: 'https://images.unsplash.com/photo-1775338782892-315ab263fab9?auto=format&fit=crop&w=400&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  caminhada: {
    title: 'Caminhada: comece devagar e vá mais longe',
    level: 'Nível iniciante',
    duration: '12min',
    bg: '#CDEBD8',
    icon: 'caminhada',
    image: 'https://images.unsplash.com/photo-1758798469179-dea5d63257ba?auto=format&fit=crop&w=400&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  alongamento: {
    title: 'Alongamento para o corpo todo',
    level: 'Nível iniciante',
    duration: '15min',
    bg: '#E2F1E7',
    icon: 'alongamento',
    image: 'https://images.unsplash.com/photo-1758798458635-f01402b40919?auto=format&fit=crop&w=400&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  equilibrio: {
    title: 'Equilíbrio e fortalecimento leve',
    level: 'Nível intermediário',
    duration: '8min',
    bg: '#C3E6D1',
    icon: 'equilibrio',
    image: 'https://images.unsplash.com/photo-1780343063962-4c7ac4bae1e7?auto=format&fit=crop&w=400&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  fortalecimento: {
    title: 'Fortalecimento de pernas e braços',
    level: 'Nível intermediário',
    duration: '10min',
    bg: '#D6ECE0',
    icon: 'fortalecimento',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  postura: {
    title: 'Postura e coluna saudável',
    level: 'Nível todos',
    duration: '9min',
    bg: '#DFF0E4',
    icon: 'postura',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  mobilidade: {
    title: 'Mobilidade articular',
    level: 'Nível iniciante',
    duration: '11min',
    bg: '#D0EAD9',
    icon: 'mobilidade',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=400&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  relaxamento: {
    title: 'Relaxamento e meditação guiada',
    level: 'Nível todos',
    duration: '7min',
    bg: '#E5F3E9',
    icon: 'relaxamento',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
};

export const WEEKLY_PLAN = {
  domingo: ['relaxamento', 'alongamento', 'respiracao'],
  segunda: ['caminhada', 'fortalecimento', 'postura'],
  terca: ['respiracao', 'caminhada', 'alongamento'],
  quarta: ['mobilidade', 'equilibrio', 'relaxamento'],
  quinta: ['fortalecimento', 'postura', 'caminhada'],
  sexta: ['alongamento', 'mobilidade', 'respiracao'],
  sabado: ['equilibrio', 'relaxamento', 'caminhada'],
};

export const WEEK_DAYS = [
  { key: 'domingo', letter: 'D', name: 'Domingo', num: 12 },
  { key: 'segunda', letter: 'S', name: 'Segunda', num: 13 },
  { key: 'terca', letter: 'T', name: 'Terça', num: 14, today: true },
  { key: 'quarta', letter: 'Q', name: 'Quarta', num: 15 },
  { key: 'quinta', letter: 'Q', name: 'Quinta', num: 16 },
  { key: 'sexta', letter: 'S', name: 'Sexta', num: 17 },
  { key: 'sabado', letter: 'S', name: 'Sábado', num: 18 },
];

export function getExercisesForDay(dayKey) {
  const categoryKeys = WEEKLY_PLAN[dayKey] || [];
  return categoryKeys.map((catKey) => ({
    id: `${dayKey}-${catKey}`,
    key: catKey,
    ...CATEGORIES[catKey],
  }));
}

export function getDayByKey(dayKey) {
  return WEEK_DAYS.find((d) => d.key === dayKey);
}