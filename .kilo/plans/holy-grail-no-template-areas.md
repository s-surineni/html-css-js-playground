# Holy Grail without `grid-template-areas`

Replace the named-area placement in `src/holy-grail-2/holy-grail.css` with
explicit **line-based** placement (`grid-column` / `grid-row`). The grid still
uses `grid-template-columns` and `grid-template-rows`; we just position each
item by its grid lines instead of by `grid-area: <name>`.

## Why this works
The grid has 3 columns (lines 1–4) and 3 rows (lines 1–4):
- `header` / `footer` span the full width → columns `1 / 4`, rows `1` and `3`.
- `nav` / `main` / `aside` sit in the middle row → row `2`, columns `1`, `2`, `3`.

## Changes to `holy-grail.css`

### `body` (remove `grid-template-areas`)
```css
body {
  font-family: sans-serif;
  font-size: 12px;
  font-weight: bold;
  margin: 0;
  display: grid;
  grid-template-columns: 100px 1fr 100px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
```

### Each region (replace `grid-area` with line placement)
```css
header {
  background-color: tomato;
  grid-column: 1 / 4;
  grid-row: 1;
}

nav {
  background-color: coral;
  grid-column: 1;
  grid-row: 2;
}

main {
  background-color: moccasin;
  grid-column: 2;
  grid-row: 2;
}

aside {
  background-color: sandybrown;
  grid-column: 3;
  grid-row: 2;
}

footer {
  background-color: slategray;
  grid-column: 1 / 4;
  grid-row: 3;
}
```

### Responsive (max-width: 768px)
Since the base rule sets explicit `grid-row`, the media query must reset it so
items auto-flow into the single column in DOM order (header, nav, main, aside,
footer):
```css
@media (max-width: 768px) {
  body {
    grid-template-columns: 1fr;
  }

  header, nav, main, aside, footer {
    grid-column: 1 / -1;
    grid-row: auto;
  }
}
```

## Notes / alternatives
- `grid-column: 1 / -1` means "span from the first to the last column line" —
  works for both the 3-column and 1-column layouts.
- Alternative without any per-item rules: use `grid-auto-flow` + give header/footer
  `grid-column: 1 / -1`, but explicit line placement above is the closest 1:1
  equivalent to `grid-template-areas` and clearest to read.
- `min-height: 100vh` stays on `body` (it is the grid container), so no change needed there.
