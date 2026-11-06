// Technology marks for the Chapter 03 arsenal.
//
// Each mark is an individual SVG in public/icons/tech, so the JavaScript
// bundle stays the same size and the browser loads only the icons it needs,
// lazily, with room reserved by the width/height attributes. Icons are
// monochrome (#111111) and muted with CSS opacity; there is no second set of
// brand-colour files.
//
// Brand paths come from Simple Icons (https://simpleicons.org, develop branch,
// retrieved 6 Nov 2026). Simple Icons is CC0-1.0; the JavaScript mark carries
// its own MIT licence. Brand marks remain trademarks of their owners and are
// used here only to identify the technology.
//
// Microsoft-related marks (including Visual Studio Code) were removed from
// Simple Icons for legal reasons, Groq's terms do not permit unlicensed logo
// use, and Google Antigravity has no Simple Icons entry yet. Those rows use
// Lucide (ISC) concepts instead of invented or borrowed brand logos: an editor
// glyph for VS Code, a bolt for Groq's fast inference, and an orbit for
// Antigravity. The same applies to the disciplines that have no brand mark
// (machine learning, statistics, data analysis, REST APIs, backend
// architecture).
//
// Icons are decorative: every skill name is visible text next to its mark.
// Per-file sources and licence notes: docs/icon-attribution.md.
const TechIcon = ({ name, className = '' }) => {
  if (!name) return null;

  return (
    <img
      src={`/icons/tech/${name}.svg`}
      alt=""
      aria-hidden="true"
      width="20"
      height="20"
      loading="lazy"
      decoding="async"
      className={`h-5 w-5 shrink-0 ${className}`}
    />
  );
};

export default TechIcon;
