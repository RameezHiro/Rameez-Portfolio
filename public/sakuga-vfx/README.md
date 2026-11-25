# Sakuga VFX button (vendored)

`button.js` is the upstream `<sakuga-button>` component from
[finktheartist/sakuga-vfx](https://github.com/finktheartist/sakuga-vfx),
released under the MIT license (see `LICENSE`).

Only the drawn-effect palette is changed: the upstream violet/lavender
(`#b8b3ff`, `#5a4fd8`, `#ff5fa8`, `#1d1a4a`) is mapped to this portfolio's
paper, ink and sakura so the burst, smoke and ドン! lettering belong on the
page. Everything else is upstream code.

It is loaded on demand by `src/components/chapters/Final.jsx` when the finale
contact CTA approaches the viewport, and themed through `--sk-*` variables in
`src/index.css`. To update the component, replace `button.js` and re-apply the
one-line palette change at `const P = ...`.
