// Chapter emblems: one local PNG per chapter opening.
//
// The artwork is a transparent square canvas, so the image can sit directly
// on the paper background without a card, border or drop shadow. Dimensions
// are declared both as attributes (intrinsic 192px) and as responsive classes
// (56 / 68 / 76px) so the layout reserves space before the file loads.
//
// The emblem is identity artwork rather than body copy, but it replaces the
// old visible "CHAPTER NN" label. Each image therefore keeps an accessible
// name that mirrors that label; pass `label` to override it where the
// surrounding copy already exposes the chapter.
const EMBLEMS = {
  '01': { src: '/emblems/chapter-01.png', label: 'Chapter 01' },
  '02': { src: '/emblems/chapter-02.png', label: 'Chapter 02' },
  '03': { src: '/emblems/chapter-03.png', label: 'Chapter 03' },
  '04': { src: '/emblems/chapter-04.png', label: 'Chapter 04' },
  '05': { src: '/emblems/chapter-05.png', label: 'Chapter 05' },
  '06': { src: '/emblems/chapter-06.png', label: 'Chapter 06' },
  '07': { src: '/emblems/chapter-07.png', label: 'Chapter 07' },
  '08': { src: '/emblems/chapter-08.png', label: 'Chapter 08' },
  FINAL: { src: '/emblems/final.png', label: 'Final chapter' },
};

export const hasChapterEmblem = (chapter) =>
  Object.prototype.hasOwnProperty.call(EMBLEMS, chapter);

const ChapterEmblem = ({ chapter, label, className = '' }) => {
  const emblem = EMBLEMS[chapter];
  if (!emblem) return null;

  return (
    <img
      src={emblem.src}
      alt={label ?? emblem.label}
      width="192"
      height="192"
      loading="lazy"
      decoding="async"
      className={`block h-14 w-14 shrink-0 md:h-[68px] md:w-[68px] lg:h-[76px] lg:w-[76px] ${className}`}
    />
  );
};

export default ChapterEmblem;
