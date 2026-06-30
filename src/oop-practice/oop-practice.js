// =====================================
// 🧬 OOP PRACTICE — live editable playground
// =====================================
// Single source of truth: the `exercises` manifest below holds the metadata
// (title, badge, description, hint) for each exercise. The starter code and the
// assertion test each live as a real lint-able file — starter under
// examples/<n>-name.js, test under tests/<n>-name.js — imported as raw source
// (no escaping). Both are matched to an exercise by the leading number in the
// filename. Cards are generated from the manifest, so adding an exercise = drop
// a starter file (+ optional test file) and add one manifest entry. Nothing in
// the HTML to keep in sync.
//
// Note: `desc` and `hint` are trusted, author-written HTML (the same markup
// that used to live in oop-practice.html) — never user input — so injecting
// them with innerHTML is safe here.
// =====================================

console.log('[1] oop-practice.js loading');
import { mountCodePlayground } from '../lib/code-playground.js';
import '../lib/code-playground.css';
console.log('[2] imports complete');

// Load every starter / test file as raw source text, keyed by the ID part of
// the filename: one or more digits, optionally followed by hyphen + more digits:
//   './examples/2-inheritance.js' -> '2'
//   './examples/1-1-prototype.js' -> '1-1'
// Both globs are eager + raw so the source ships in the bundle, not fetched at runtime.
const rawById = (modules) => {
  const out = {};
  for (const [path, source] of Object.entries(modules)) {
    const id = path.match(/\/(\d+(?:-\d+)?)-/)?.[1];
    if (id) out[id] = source.trimEnd();
  }
  return out;
};

console.log('[3] about to load starters/tests');
const starters = rawById(
  import.meta.glob('./examples/*.js', { query: '?raw', import: 'default', eager: true }),
);
const tests = rawById(
  import.meta.glob('./tests/*.js', { query: '?raw', import: 'default', eager: true }),
);
console.log('[4] loaded:', Object.keys(starters).length, 'starters,', Object.keys(tests).length, 'tests');

// Per-exercise metadata. `desc` and `hint` are trusted authored HTML. The
// starter code and assertion test for each id are loaded from the files above.
const exercises = [
  {
    id: '1',
    title: 'Prototype based',
    badge: 'easy',
    desc: `OOP using prototypes on plain objects. Try changing the names or adding
      a method, then run it.`,
    hint: `<code>Object.setPrototypeOf(child, parent)</code> makes <code>parent</code>'s
      properties available on <code>child</code> via the prototype chain.`,
  },
    {
    id: '1-1',
    title: 'Prototype based with getter and setter',
    badge: 'easy',
    desc: `OOP using prototypes on plain objects. Try changing the names or adding
      a method, then run it.`,
    hint: `<code>Object.setPrototypeOf(child, parent)</code> makes <code>parent</code>'s
      properties available on <code>child</code> via the prototype chain.`,
    test: '',
  },
      {
    id: '1-2',
    title: 'Prototype based with polymorphism',
    badge: 'easy',
    desc: `OOP using prototypes on plain objects. Try changing the names or adding
      a method, then run it.`,
    hint: `<code>Object.setPrototypeOf(child, parent)</code> makes <code>parent</code>'s
      properties available on <code>child</code> via the prototype chain.`,
    test: '',
  },
        {
    id: '2-2',
    title: 'Constructor based oop',
    badge: 'easy',
    desc: `OOP using prototypes on plain objects. Try changing the names or adding
      a method, then run it.`,
    hint: `<code>Object.setPrototypeOf(child, parent)</code> makes <code>parent</code>'s
      properties available on <code>child</code> via the prototype chain.`,
    test: '',
  },
  {
    id: '2',
    title: 'Inheritance (extends)',
    badge: 'medium',
    desc: `A <strong>LibraryBook</strong> class that extends <strong>Book</strong>,
      adds an <code>isBorrowed</code> flag with <code>borrow()</code> /
      <code>returnBook()</code>, and overrides <code>getInfo()</code>.`,
    hint: `Call <code>super(title, author, year)</code> in the constructor.
      Use <code>super.getInfo()</code> inside the overridden method.`,
  },
  {
    id: '3',
    title: 'Getters & Setters',
    badge: 'medium',
    desc: `A <strong>Rectangle</strong> with getters for <code>area</code> /
      <code>perimeter</code> and a <code>width</code> setter that rejects
      non-positive values.`,
    hint: `Use <code>_width</code> / <code>_height</code> as backing fields.
      <code>get area() { }</code>, <code>set width(v) { if (v > 0) … }</code>`,
  },
  {
    id: '4',
    title: 'Static Methods',
    badge: 'medium',
    desc: `A <strong>TemperatureConverter</strong> with a static <code>FACTOR = 9/5</code>
      and static methods <code>celsiusToFahrenheit(c)</code> /
      <code>fahrenheitToCelsius(f)</code>.`,
    hint: `<code>static methodName() { … }</code> — call on the class, not on an instance.`,
  },
  {
    id: '5',
    title: 'Private Fields (#)',
    badge: 'hard',
    desc: `A <strong>BankAccount</strong> with a private <code>#balance</code> field,
      <code>deposit(amount)</code>, <code>withdraw(amount)</code> (must not go
      below 0), and a <code>balance</code> getter.`,
    hint: `Declare <code>#balance</code> at the top of the class body.
      Access it with <code>this.#balance</code> inside methods.`,
  },
  {
    id: '6',
    title: 'Polymorphism',
    badge: 'hard',
    desc: `A base <strong>Shape</strong> with <code>getArea()</code>, extended by
      <strong>Circle</strong> (π·r²) and <strong>Square</strong> (s²), each
      overriding <code>getArea()</code>.`,
    hint: `Use <code>Math.PI</code> for pi. Call <code>super()</code> in subclass constructors.
      Polymorphism lets you call the same method on different shapes.`,
  },
];

const BADGE_LABELS = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };

// Build one exercise card and mount its editable playground.
function renderExercise({ id, title, badge, desc, hint }) {
  const starter = starters[id];
  if (!starter) {
    console.warn(`[oop-practice] no starter file found for exercise ${id} — skipping.`);
    return null;
  }
  // Tests are optional — exercise 1 is a freeform "edit and run" with no asserts.
  const test = tests[id] ?? '';

  const section = document.createElement('section');
  section.className = 'exercise';
  section.dataset.exercise = id;
  // Trusted authored HTML (see file header) — not user input.
  section.innerHTML = `
    <div class="exercise-header">
      <span class="number">${id}</span>
      <span class="title">${title}</span>
      <span class="badge ${badge}">${BADGE_LABELS[badge] ?? badge}</span>
    </div>
    <p class="description">${desc}</p>
    <details class="hint">
      <summary>💡 Hint</summary>
      <p>${hint}</p>
    </details>`;

  mountCodePlayground(section, {
    code: starter,
    test,
    label: `Code editor for exercise ${id}`,
  });

  return section;
}

console.log('[5] exercises:', exercises.length);
const container = document.querySelector('.container');
console.log('[6] container:', container);
for (const exercise of exercises) {
  const card = renderExercise(exercise);
  if (card) container.append(card);
}
console.log('[7] render loop complete');
