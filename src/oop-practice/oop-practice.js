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
const rawById = (modules, kind) => {
  const out = {};
  for (const [path, source] of Object.entries(modules)) {
    const id = path.match(/\/(\d+(?:-\d+)?)-/)?.[1];
    if (!id) continue;
    if (Object.hasOwn(out, id)) {
      throw new Error(`[oop-practice] duplicate ${kind} id "${id}" from ${path}`);
    }
    out[id] = source.trimEnd();
  }
  return out;
};

console.log('[3] about to load starters/tests');
const starters = rawById(
  import.meta.glob('./examples/*.js', { query: '?raw', import: 'default', eager: true }),
  'starter',
);
const tests = rawById(
  import.meta.glob('./tests/*.js', { query: '?raw', import: 'default', eager: true }),
  'test',
);
console.log('[4] loaded:', Object.keys(starters).length, 'starters,', Object.keys(tests).length, 'tests');

// Per-exercise metadata. `desc` and `hint` are trusted authored HTML. The
// starter code and assertion test for each id are loaded from the files above.
const exercises = [
  {
    id: '1',
    title: 'Object Prototypes and Property Lookup',
    badge: 'easy',
    desc: `Create a child with <code>Object.create()</code>, inspect its prototype,
      and observe own properties, inherited properties, shadowing, and <code>delete</code>.
          demonstrates oop concept of having data and function together.
    but this example does not have encapsulation.`,
    hint: `<code>Object.create(parent)</code> chooses the prototype at creation time.
      <code>Object.hasOwn()</code> distinguishes own properties from inherited ones.`,
  },
  {
    id: '1-1',
    title: 'Prototype Getters and Setters',
    badge: 'easy',
    desc: `Compare a regular method with a property-style getter, then use a validating
      setter to update a full name while preserving multi-word last names. A child
      inherits the same accessors, but <code>this</code> refers to the child, so its name
      changes without modifying the prototype object.`,
    hint: `Accessors are invoked like properties. Normalize input with
      <code>trim().split(/\s+/)</code> before updating state.`,
  },
  {
    id: '1-2',
    title: 'Prototype Method Overriding',
    badge: 'easy',
    desc: `A child shadows an inherited method while continuing to inherit other
      behavior from its prototype.`,
    hint: `Property lookup stops at the first match. Deleting the child's override
      reveals the inherited method again.`,
  },
  {
    id: '1-3',
    title: 'Factory Function with Encapsulation (Module Pattern)',
    badge: 'easy',
    desc: `Real encapsulation without classes or constructors — just a plain factory
      function returning an object literal. Private variables live in the closure,
      completely inaccessible from outside.`,
    hint: `Variables declared inside the function (like <code>count</code>) are private
      via closure. Only the returned object's methods can access them. No <code>new</code>
      keyword needed — just call the function.`,
  },
  {
    id: '1-4',
    title: 'Prototype Polymorphism',
    badge: 'easy',
    desc: `Polymorphism using object prototypes — different objects share the same
      interface (method names) but implement different behaviors. Includes two examples:
      Animal sounds and Shape area calculations.`,
    hint: `Polymorphism means "many forms" — same method name, different implementations.
      <code>describe()</code> is shared on the prototype, but calls the overridden
      methods like <code>makeSound()</code> or <code>getArea()</code>.`,
  },
  {
    id: '2-1',
    title: 'Constructor Functions and new',
    badge: 'easy',
    desc: `See what <code>new</code> does, compare own properties and per-instance
      functions with shared prototype methods, inspect the complete prototype chain,
      and safely handle constructor calls made without <code>new</code>.`,
    hint: `<code>new Person()</code> creates an object linked to
      <code>Person.prototype</code>, calls <code>Person</code> with that object as
      <code>this</code>, and returns it. Use <code>Object.hasOwn()</code> to distinguish
      instance properties from inherited methods.`,
  },
  {
    id: '2-2',
    title: 'Constructor Prototype Accessors',
    badge: 'easy',
    desc: `Add a getter and setter to an existing constructor prototype without
      replacing the prototype or breaking its <code>constructor</code> property.`,
    hint: `Use <code>Object.defineProperty()</code>. Accessors defined this way can
      be non-enumerable, like methods created by class syntax.`,
  },
  {
    id: '2-3',
    title: 'Constructor Function Inheritance',
    badge: 'easy',
    desc: `Combine constructor stealing with prototype delegation so a
      <strong>SuperHero</strong> inherits both instance state and shared methods.`,
    hint: `Call <code>Person.call(this, ...)</code>, link prototypes with
      <code>Object.create(Person.prototype)</code>, then restore <code>constructor</code>.`,
  },
  {
    id: '2-4',
    title: 'Constructor Private Variables',
    badge: 'medium',
    desc: `Private variables and methods using closures in constructor functions.
      A <strong>BankAccount</strong> with private <code>balance</code> and
      <code>validateAmount()</code>, public <code>deposit()</code>,
      <code>withdraw()</code>, and <code>getBalance()</code> methods.`,
    hint: `Variables declared with <code>let</code>/<code>const</code> inside the
      constructor are private. Methods defined with <code>this.method = function() {}</code>
      can access them via closure, but they're not on the prototype.`,
  },
  {
    id: '2-5',
    title: 'Constructor Closure Privacy — Prototype Method Trade-off',
    badge: 'medium',
    desc: `Demonstrates the key limitation: <strong>prototype methods cannot access
      private variables</strong> from the constructor. Only instance methods
      (defined with <code>this.method = function</code>) can access them via closure,
      but this is memory-inefficient.`,
    hint: `Prototype methods exist outside the constructor's closure, so they can't see
      variables declared inside it. The tradeoff: true privacy (instance methods) vs
      memory efficiency (prototype methods). Use <code>_propertyName</code> convention
      for "private-by-convention" with prototypes.`,
  },
  {
    id: '2',
    displayId: '3',
    title: 'Inheritance (extends)',
    badge: 'medium',
    desc: `Class syntax is prototype-backed. A <strong>LibraryBook</strong> extends <strong>Book</strong>,
      adds an <code>isBorrowed</code> flag with <code>borrow()</code> /
      <code>returnBook()</code>, and overrides <code>getInfo()</code>.`,
    hint: `Call <code>super(title, author, year)</code> in the constructor.
      Use <code>super.getInfo()</code> inside the overridden method, then inspect
      <code>LibraryBook.prototype</code> to see the underlying chain.`,
  },
  {
    id: '3',
    displayId: '4',
    title: 'Getters & Setters',
    badge: 'medium',
    desc: `A <strong>Rectangle</strong> with getters for <code>area</code> /
      <code>perimeter</code> and setters that reject invalid dimensions.`,
    hint: `Route constructor assignments through setters so initial values and later
      updates follow the same validation rules.`,
  },
  {
    id: '4',
    displayId: '5',
    title: 'Static Methods',
    badge: 'medium',
    desc: `A <strong>TemperatureConverter</strong> with a static <code>FACTOR = 9/5</code>
      and static methods <code>celsiusToFahrenheit(c)</code> /
      <code>fahrenheitToCelsius(f)</code>.`,
    hint: `<code>static methodName() { … }</code> — call on the class, not on an instance.
      Using <code>this.FACTOR</code> allows subclasses to customize the factor.`,
  },
  {
    id: '5',
    displayId: '6',
    title: 'Private Fields (#)',
    badge: 'hard',
    desc: `A <strong>BankAccount</strong> with a private <code>#balance</code> field,
      validated <code>deposit(amount)</code> / <code>withdraw(amount)</code>, and a
      read-only <code>balance</code> getter.`,
    hint: `Declare <code>#balance</code> at the top of the class body.
      Access it with <code>this.#balance</code> inside methods.`,
  },
  {
    id: '6',
    displayId: '7',
    title: 'Polymorphism',
    badge: 'hard',
    desc: `A base <strong>Shape</strong> with <code>getArea()</code>, extended by
      <strong>Circle</strong> (π·r²) and <strong>Square</strong> (s²), each
      fulfilling the base method contract by overriding <code>getArea()</code>.`,
    hint: `Use <code>Math.PI</code> for pi. Call <code>super()</code> in subclass constructors.
      Polymorphism lets you call the same method on different shapes.`,
  },
];

const exerciseIds = exercises.map(({ id }) => id);
if (new Set(exerciseIds).size !== exerciseIds.length) {
  throw new Error('[oop-practice] duplicate id in exercise manifest');
}
for (const id of Object.keys(starters)) {
  if (!exerciseIds.includes(id)) {
    throw new Error(`[oop-practice] starter ${id} is not listed in the exercise manifest`);
  }
}

const BADGE_LABELS = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };

// Build one exercise card and mount its editable playground.
function renderExercise({ id, displayId = id, title, badge, desc, hint }) {
  const starter = starters[id];
  if (!starter) {
    console.warn(`[oop-practice] no starter file found for exercise ${id} — skipping.`);
    return null;
  }
  // Tests are optional, though every current exercise has assertion coverage.
  const test = tests[id] ?? '';

  const section = document.createElement('section');
  section.className = 'exercise';
  section.dataset.exercise = id;
  // Trusted authored HTML (see file header) — not user input.
  section.innerHTML = `
    <div class="exercise-header">
      <span class="number">${displayId}</span>
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
