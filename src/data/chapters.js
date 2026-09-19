// Canonical chapter registry (ESM).
// Single source of truth for chapter metadata consumed by navigation,
// the chapter observer and future chapter components.

export const chapters = [
  {
    id: 'prologue',
    number: 0,
    title: 'PROLOGUE',
    slug: 'prologue',
    description: 'Introduction to the portfolio',
    type: 'introductory',
  },
  {
    id: '01',
    number: 1,
    title: 'THE ORIGIN',
    slug: 'the-origin',
    description: 'Before the code, there was curiosity',
    type: 'story',
  },
  {
    id: '02',
    number: 2,
    title: 'TRAINING',
    slug: 'training',
    description: 'Every skill was another weapon.',
    type: 'story',
  },
  {
    id: '03',
    number: 3,
    title: 'ARSENAL',
    slug: 'arsenal',
    description: 'From mathematics to algorithms — the machinery underneath machine learning',
    type: 'story',
  },
  {
    id: '04',
    number: 4,
    title: 'THE BATTLE ARC',
    slug: 'the-battle-arc',
    description: 'My journey through challenges',
    type: 'story',
  },
  {
    id: '05',
    number: 5,
    title: 'THE PROJECT ARC',
    slug: 'the-project-arc',
    description: 'My projects and their impact',
    type: 'story',
  },
  {
    id: '06',
    number: 6,
    title: 'EVOLUTION',
    slug: 'evolution',
    description: 'How I have grown as a developer',
    type: 'story',
  },
  {
    id: '07',
    number: 7,
    title: 'CURRENT',
    slug: 'current',
    description: 'Where I am now',
    type: 'story',
  },
  {
    id: '08',
    number: 8,
    title: 'NEXT',
    slug: 'next',
    description: 'What lies ahead',
    type: 'story',
  },
  {
    id: 'final',
    number: 9,
    title: 'CURRENT ARC',
    slug: 'current-arc',
    description: 'Final thoughts and reflections',
    type: 'conclusion',
  },
];

export const getChapterById = (id) =>
  chapters.find((chapter) => chapter.id === id);

export const getChapterBySlug = (slug) =>
  chapters.find((chapter) => chapter.slug === slug);

const chaptersData = {
  chapters,
  getChapterById,
  getChapterBySlug,
};

export default chaptersData;
