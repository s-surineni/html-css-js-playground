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
  const id = path.match(/\/(\d+)-/)?.[1];
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
    id: '2',
    title: 'Inheritance (extends)',
    badge: 'medium',
    desc: `A <strong>LibraryBook</strong> class that extends <strong>Book</strong>,
      adds an <code>isBorrowed</code> flag with <code>borrow()</code> /
      <code>returnBook()</code>, and overrides <code>getInfo()</code>.`,
    hint: `Call <code>super(title, author, year)</code> in the constructor.
      Use <code>super.getInfo()</code> inside the overridden method.`,
    test: `const lb = new LibraryBook('1984', 'George Orwell', 1949);
let msg = lb.getInfo() + '\\n';
msg += 'borrow: ' + lb.borrow() + '\\n';
msg += 'return: ' + lb.returnBook();
return msg;`,
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
let s = 'area = ' + r.area + ', perimeter = ' + r.perimeter + '\\n';
r.width = 20;
s += 'after width=20 → area = ' + r.area;
return s;`,
  },
  {
    id: '4',
    title: 'Static Methods',
    badge: 'medium',
    desc: `A <strong>TemperatureConverter</strong> with a static <code>FACTOR = 9/5</code>
      and static methods <code>celsiusToFahrenheit(c)</code> /
      <code>fahrenheitToCelsius(f)</code>.`,
    hint: `<code>static methodName() { … }</code> — call on the class, not on an instance.`,
    test: `const c = 25, f = 77;
const r1 = TemperatureConverter.celsiusToFahrenheit(c);
const r2 = TemperatureConverter.fahrenheitToCelsius(f);
return \`\${c}°C = \${r1.toFixed(1)}°F\\n\${f}°F = \${r2.toFixed(1)}°C\`;`,
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
let log = 'balance = $' + acct.balance + '\\n';
log += 'deposit(500): ' + acct.deposit(500) + '\\n';
log += 'withdraw(200): ' + acct.withdraw(200) + '\\n';
log += 'final balance = $' + acct.balance;
return log;`,
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
    test: `const shapes = [new Circle(5), new Square(4)];
let poly = '';
shapes.forEach((s) => {
  poly += \`\${s.constructor.name} area = \${s.getArea().toFixed(2)}\\n\`;
});
return poly;`,
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
