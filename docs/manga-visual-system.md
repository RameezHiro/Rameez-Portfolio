# Manga visual system — Phase 1

The palette, type, and story already existed. Phase 1 adds the missing layer:
page composition. This document describes the reusable primitives, the
composition pattern they support, and the one chapter that proves the system.

Scope: **Chapter 04 only**. No other chapter was recomposed, no copy was
rewritten, and no new dependencies, colours, images, or motion were added.

## Primitives

### `MangaSpread` — `src/components/ui/MangaSpread.jsx`

A 12-column CSS grid with fixed gutters. Cells declare their own span, so a
chapter can change the rhythm without new props.

```jsx
<MangaSpread gap="lg">
  <div className="col-span-12 md:col-span-4">margin note</div>
  <div className="col-span-12 md:col-span-8">main field</div>
</MangaSpread>
```

Gutters are split into `gap-x` / `gap-y`. Horizontal gaps stay small on narrow
screens so twelve columns cannot force overflow at 320 px; vertical gaps keep
the page breathing room.

### `MangaPanel` — `src/components/ui/MangaPanel.jsx`

The existing panel primitive, extended rather than replaced. Three independent
axes:

| Prop | Values | Meaning |
|---|---|---|
| `variant` | `traditional`, `technical`, `cinematic`, `bleed`, `silent` | the frame |
| `tone` | `paper`, `muted`, `ink` | the ground |
| `padding` | `none`, `sm`, `md`, `lg` | the interior |

`bleed` escapes the chapter column to the page edge. `as` lets a panel render as
`figure`, `section`, or any other semantic element.

### `SectionLabel` — `src/components/ui/SectionLabel.jsx`

A caption/narration label: hairline, scene index, short label. It supports the
scene without repeating the section heading. `tone="paper"` is the ink-panel
variant. The old invalid `text-tech` class is gone.

### `SakuraGrowth` — `src/components/shared/SakuraGrowth.jsx`

Added an opt-in `crop` prop. It tightens the viewBox to the drawing and anchors
the ground line (`preserveAspectRatio="xMidYMax slice"`), so the tree can carry a
panel instead of sitting in whitespace. Defaults are unchanged for every
existing caller.

### CSS utilities — `src/index.css`

- `[data-chapter] { container-type: inline-size }` — every chapter is a page.
- `.manga-bleed` — full-bleed using `100cqw` instead of `100vw`, so a vertical
  scrollbar cannot create horizontal overflow. Falls back to a gutter bleed.
- `.manga-screentone` — a single reusable halftone dot pattern, applied once per
  panel at low opacity and never behind body copy.

## Composition pattern

A chapter can now move through four beats instead of one repeated column:

1. **Identity** — the existing `Chapter` header (kicker, `h2`, description).
2. **Establishing spread** — one visual subject, larger than the supporting text.
3. **Supporting information** — margin heading plus field, or a dominant panel
   beside a narrow strip.
4. **Transition** — a tonal cut or a quiet panel before the next chapter.

Not every chapter needs every beat. The pattern is a vocabulary, not a template.

## Proof of concept — Chapter 04, THE BATTLE ARC

Chapter 04 was chosen because its content is already panel-ready: a doctrine
list, a strong record, a deliberately thin record, a reflective set of losses,
and a closing line. It needed no copy rewrite and no missing assets.

What changed:

- **Establishing spread (full-bleed ink).** The opening statement moves into a
  dark page-wide panel with a white inset holding the Stage 04 tree, cropped to
  scene scale. The tree is now the chapter's visual subject; the statement drops
  to `3xl` so the chapter title stays the only page title.
- **Doctrine (split panel).** The section heading moves into a four-column
  margin; the six rules occupy the eight-column field.
- **Battle records (8/4 spread).** Record 01 keeps the dominant treatment.
  Record 02 becomes a narrow, offset technical panel, which states its thinner
  evidence through scale rather than extra copy.
- **Lost battles (impact panel).** A contained deep-ink panel provides the
  chapter's tonal cut; `WHAT BROKE` is the only sakura accent.
- **Closing (quiet panel).** The tree moves to the opening, leaving a mostly
  empty paper panel with one statement and the transition out.

Every sentence, label, link, and number from the original chapter is preserved.
The tree, caption, and next-chapter control are unchanged in meaning.

## Accessibility and responsiveness

- Heading order is unchanged: one `h1`, one `h2` per chapter, `h3` per section.
- The establishing statement is a `p`, not a heading.
- Text on ink uses `paper` at full or reduced opacity; `sakura` is used for
  large display text and the single `WHAT BROKE` accent. Measured ratios:
  sakura on deep ink 5.57:1, paper/75 9.6:1, paper/60 6.54:1, `sakura-text` on
  paper 4.56:1, `manga-gray` on paper 6.1:1.
- No new focusable elements. The record link and next-chapter button keep their
  `focus-visible` rings.
- `Reveal` and `SakuraGrowth` still respect `prefers-reduced-motion`.
- Full bleed was verified at 320, 390, 768, 1024, and 1440 px with no horizontal
  overflow and no clipped panel content.

## Deferred

- Chapter 01/02/03/05/06/07/08 recomposition (Phase 2).
- Chapter signatures per chapter, URL state, and nav reduction (Phase 3).
- Real project artifacts and architecture diagrams (Phase 2, needs assets).
- The 768 px desktop nav crowding is pre-existing and belongs to Phase 3.
