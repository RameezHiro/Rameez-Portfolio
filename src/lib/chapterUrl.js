import chaptersData from '../data/chapters';

// Chapter addressability.
//
// The portfolio is a single page mounted at `/`, so chapter state lives in the
// query string rather than the path:
//
//   /                       → Chapter 01 (the existing home URL)
//   /?chapter=the-battle-arc → Chapter 04
//
// A query parameter keeps the deployed static hosting working with no rewrite
// rules and leaves the home URL untouched. The slug is read from the canonical
// chapter registry, so chapter links never drift from chapter metadata.
export const CHAPTER_PARAM = 'chapter';
export const DEFAULT_CHAPTER_ID = '01';

export const getChapterIdFromUrl = () => {
  if (typeof window === 'undefined') return null;
  const slug = new URLSearchParams(window.location.search).get(CHAPTER_PARAM);
  if (!slug) return null;
  return chaptersData.getChapterBySlug(slug)?.id ?? null;
};

export const getChapterUrl = (chapterId) => {
  const url = new URL(window.location.href);
  const slug = chaptersData.getChapterById(chapterId)?.slug;

  // Chapter 01 is the home state, so the parameter is removed rather than set.
  if (!slug || chapterId === DEFAULT_CHAPTER_ID) {
    url.searchParams.delete(CHAPTER_PARAM);
  } else {
    url.searchParams.set(CHAPTER_PARAM, slug);
  }

  return `${url.pathname}${url.search}${url.hash}`;
};

// `push` is for deliberate chapter jumps (Back returns to the previous
// chapter). `replace` is for scroll-driven updates, which must not add
// history entries.
export const writeChapterUrl = (chapterId, mode = 'replace') => {
  if (typeof window === 'undefined') return;
  const next = getChapterUrl(chapterId);
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (next === current) return;

  const state = { chapter: chapterId };
  if (mode === 'push') {
    window.history.pushState(state, '', next);
  } else {
    window.history.replaceState(state, '', next);
  }
};
