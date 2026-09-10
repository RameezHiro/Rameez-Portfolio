// Chapter configuration system
const chapters = [];

// Placeholder for chapter metadata
const chapterMetadata = {
  Prologue: {
    id: 'prologue',
    number: 0,
    title: 'Prologue',
    slug: 'prologue',
    description: 'Introduction to the portfolio',
    type: 'introductory',
  },
  'Chapter 01': {
    id: 'chapter-01',
    number: 1,
    title: 'The Origin',
    slug: 'the-origin',
    description: 'The beginning of my developer journey',
    type: 'story',
  },
  'Chapter 02': {
    id: 'chapter-02',
    number: 2,
    title: 'Training',
    slug: 'training',
    description: 'How I honed my skills',
    type: 'story',
  },
  'Chapter 03': {
    id: 'chapter-03',
    number: 3,
    title: 'Arsenal',
    slug: 'arsenal',
    description: 'The tools and technologies I use',
    type: 'story',
  },
  'Chapter 04': {
    id: 'chapter-04',
    number: 4,
    title: 'Battle Arc',
    slug: 'battle-arc',
    description: 'My journey through challenges',
    type: 'story',
  },
  'Chapter 05': {
    id: 'chapter-05',
    number: 5,
    title: 'Project Arc',
    slug: 'project-arc',
    description: 'My projects and their impact',
    type: 'story',
  },
  'Chapter 06': {
    id: 'chapter-06',
    number: 6,
    title: 'Evolution',
    slug: 'evolution',
    description: 'How I have grown as a developer',
    type: 'story',
  },
  'Chapter 07': {
    id: 'chapter-07',
    number: 7,
    title: 'Current',
    slug: 'current',
    description: 'Where I am now',
    type: 'story',
  },
  'Chapter 08': {
    id: 'chapter-08',
    number: 8,
    title: 'Next',
    slug: 'next',
    description: 'What lies ahead',
    type: 'story',
  },
  Final: {
    id: 'final',
    number: 9,
    title: 'Current Arc',
    slug: 'current-arc',
    description: 'Final thoughts and reflections',
    type: 'conclusion',
  }
};

module.exports = {
  chapters: Object.values(chapterMetadata),
  getChapterById: (id) => chapterMetadata[id],
  getChapterBySlug: (slug) => Object.values(chapterMetadata).find(chapter => chapter.slug === slug),
};