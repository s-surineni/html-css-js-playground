// =====================================
// 🧬 OOP PRACTICE — live editable playground
// =====================================
// Single source of truth: the `exercises` manifest below holds the metadata
// (title, badge, description, hint, test) for each exercise, and the starter
// code lives as a real lint-able file under examples/<n>-name.js (imported as
// raw source — no escaping). Cards are generated from the manifest, so adding
// an exercise = drop a starter file + add one manifest entry. Nothing in the
// HTML to keep in sync.
//
// Note: `desc` and `hint` are trusted, author-written HTML (the same markup
// that used to live in oop-practice.html) — never user input — so injecting
// them with innerHTML is safe here.
// =====================================

import { mountCodePlayground } from '../lib/code-playground.js';
import '../lib/code-playground.css';

// Load every starter file as raw source text, keyed by the leading number in
// the filename (e.g. './examples/2-inheritance.js' -> '2').
const starterModules = import.meta.glob('./examples/*.js', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const starters = {};
for (const [path, source] of Object.entries(starterModules)) {
  const id = path.match(/\/(\d+(?:-\d+)?)-/)?.[1];
  if (id) starters[id] = source.trimEnd();
}

// Per-exercise metadata. `desc` and `hint` are trusted authored HTML.
// `test` runs in the same scope as the starter and returns a string to display.
const exercises = [
  {
    id: '1',
    title: 'Prototype based',
    badge: 'easy',
    desc: `OOP using prototypes on plain objects. Try changing the names or adding
      a method, then run it.`,
    hint: `<code>Object.setPrototypeOf(child, parent)</code> makes <code>parent</code>'s
      properties available on <code>child</code> via the prototype chain.`,
    test: '',
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
    id: '2',
    title: 'Inheritance (extends)',
    badge: 'medium',
    desc: `A <strong>LibraryBook</strong> class that extends <strong>Book</strong>,
      adds an <code>isBorrowed</code> flag with <code>borrow()</code> /
      <code>returnBook()</code>, and overrides <code>getInfo()</code>.`,
    hint: `Call <code>super(title, author, year)</code> in the constructor.
      Use <code>super.getInfo()</code> inside the overridden method.`,
    test: `const lb = new LibraryBook('1984', 'George Orwell', 1949);
expect(lb.isBorrowed, false, 'starts not borrowed');
expect(lb.getInfo(), '1984 by George Orwell (1949) — available', 'getInfo() when available');
lb.borrow();
expect(lb.isBorrowed, true, 'borrow() sets the flag');
expect(lb.getInfo(), '1984 by George Orwell (1949) — borrowed', 'getInfo() reflects borrowed');
lb.returnBook();
expect(lb.isBorrowed, false, 'returnBook() clears the flag');`,
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
    test: `const r = new Rectangle(10, 5);
expect(r.area, 50, 'area = width × height');
expect(r.perimeter, 30, 'perimeter = 2 × (w + h)');
r.width = 20;
expect(r.area, 100, 'area updates after a valid width setter');
r.width = -4;
expect(r.width, 20, 'setter rejects non-positive width');`,
  },
  {
    id: '4',
    title: 'Static Methods',
    badge: 'medium',
    desc: `A <strong>TemperatureConverter</strong> with a static <code>FACTOR = 9/5</code>
      and static methods <code>celsiusToFahrenheit(c)</code> /
      <code>fahrenheitToCelsius(f)</code>.`,
    hint: `<code>static methodName() { … }</code> — call on the class, not on an instance.`,
    test: `expect(TemperatureConverter.celsiusToFahrenheit(25), 77, '25°C → 77°F');
expect(TemperatureConverter.celsiusToFahrenheit(0), 32, '0°C → 32°F');
expect(TemperatureConverter.fahrenheitToCelsius(77), 25, '77°F → 25°C');
expect(TemperatureConverter.FACTOR, 1.8, 'static FACTOR is 9/5');`,
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
    test: `const acct = new BankAccount('Alice', 1000);
expect(acct.balance, 1000, 'initial balance');
acct.deposit(500);
expect(acct.balance, 1500, 'deposit(500) adds to balance');
acct.withdraw(200);
expect(acct.balance, 1300, 'withdraw(200) subtracts from balance');
acct.withdraw(99999);
expect(acct.balance, 1300, 'over-withdraw is rejected');`,
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
    test: `expect(new Circle(5).getArea().toFixed(2), '78.54', 'Circle area = π·r²');
expect(new Square(4).getArea(), 16, 'Square area = s²');
expect(new Shape().getArea(), 0, 'base Shape returns 0');
const total = [new Circle(5), new Square(4)].reduce((sum, s) => sum + s.getArea(), 0);
expect(total.toFixed(2), '94.54', 'polymorphic sum over a mixed array');`,
  },
];

const BADGE_LABELS = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };

// Build one exercise card and mount its editable playground.
function renderExercise({ id, title, badge, desc, hint, test }) {
  const starter = starters[id];
  if (!starter) {
    console.warn(`[oop-practice] no starter file found for exercise ${id} — skipping.`);
    return null;
  }

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

const container = document.querySelector('.container');
for (const exercise of exercises) {
  const card = renderExercise(exercise);
  if (card) container.append(card);
}
