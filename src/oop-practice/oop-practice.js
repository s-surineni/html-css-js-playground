// OOP Practice — live editable curriculum.
// Metadata lives below; starter and assertion files are loaded by their numeric ID.
import { mountCodePlayground } from '../lib/code-playground.js';
import '../lib/code-playground.css';

const rawById = (modules, kind) => {
  const sources = {};
  for (const [path, source] of Object.entries(modules)) {
    const id = path.match(/\/(\d+-\d+)-/)?.[1];
    if (!id) continue;
    if (Object.hasOwn(sources, id)) {
      throw new Error(`[oop-practice] duplicate ${kind} id "${id}" from ${path}`);
    }
    sources[id] = source.trimEnd();
  }
  return sources;
};

const starters = rawById(
  import.meta.glob('./examples/*.js', { query: '?raw', import: 'default', eager: true }),
  'starter',
);
const tests = rawById(
  import.meta.glob('./tests/*.js', { query: '?raw', import: 'default', eager: true }),
  'test',
);

const curriculum = [
  {
    id: 'objects',
    title: '1. Objects and Prototypes',
    desc: 'Start with method receivers, then add delegation, overriding, polymorphism, and closure privacy.',
    exercises: [
      {
        id: '1-1',
        title: 'Object Methods and this',
        badge: 'easy',
        desc: `See how a method receives <code>this</code> from its caller, supply a
          receiver with <code>call()</code>/<code>apply()</code>/<code>bind()</code>,
          and compare regular methods with arrow functions.`,
        hint: `For a regular function, <code>this</code> depends on how it is called.
          An arrow function captures <code>this</code> from its surrounding scope.`,
      },
      {
        id: '1-2',
        title: 'Prototype Delegation and Property Lookup',
        badge: 'easy',
        desc: `Create a child with <code>Object.create()</code> and observe own properties,
          inherited methods, shadowing, lookup with <code>in</code>, and <code>delete</code>.`,
        hint: `<code>Object.hasOwn()</code> checks only the object; <code>in</code> searches
          the complete prototype chain.`,
      },
      {
        id: '1-3',
        title: 'Prototype Getters and Setters',
        badge: 'easy',
        desc: `Inherit a validating accessor and observe that <code>this</code> refers to
          the receiving child, leaving the prototype object's state unchanged.`,
        hint: `An inherited setter can create or update ordinary properties on its receiver
          without creating an own accessor property.`,
      },
      {
        id: '1-4',
        title: 'Prototype Method Overriding',
        badge: 'easy',
        desc: `Override an inherited method with an own property, then delete the override
          to reveal the original prototype behavior.`,
        hint: `Property lookup stops at the first matching property in the chain.`,
      },
      {
        id: '1-5',
        title: 'Prototype Polymorphism',
        badge: 'medium',
        desc: `Call the same operation on different child objects while each supplies its
          own implementation and shares common behavior through a prototype.`,
        hint: `Polymorphism means one interface with multiple implementations.`,
      },
      {
        id: '1-6',
        title: 'Factory Functions and Closure Privacy',
        badge: 'medium',
        desc: `Return an object from a factory while keeping per-object state private in
          a closure—without <code>new</code> or class syntax.`,
        hint: `Only functions created inside the factory can access its local variables.`,
      },
    ],
  },
  {
    id: 'constructors',
    title: '2. Constructor Functions',
    desc: 'Build instances with new, share behavior through prototypes, and compare privacy strategies.',
    exercises: [
      {
        id: '2-1',
        title: 'Constructor Basics and new',
        badge: 'easy',
        desc: `Initialize instance state with a constructor and inspect the prototype and
          <code>constructor</code> links established by <code>new</code>.`,
        hint: `<code>new</code> creates an object, links it to
          <code>Constructor.prototype</code>, calls the constructor as <code>this</code>,
          and returns the object.`,
      },
      {
        id: '2-2',
        title: 'Instance Methods vs Prototype Methods',
        badge: 'easy',
        desc: `Compare a function recreated by the constructor with one shared by every
          instance through the constructor's prototype.`,
        hint: `Use <code>Object.hasOwn()</code> and function identity to see where methods live.`,
      },
      {
        id: '2-3',
        title: 'Constructor Prototype Accessors',
        badge: 'medium',
        desc: `Add a non-enumerable getter and setter to an existing prototype with
          <code>Object.defineProperty()</code>.`,
        hint: `A property descriptor controls accessor functions and flags such as
          <code>enumerable</code> and <code>configurable</code>.`,
      },
      {
        id: '2-4',
        title: 'Constructor Function Inheritance',
        badge: 'medium',
        desc: `Combine parent initialization with prototype delegation so a child receives
          both instance state and shared parent methods.`,
        hint: `Call the parent with <code>Parent.call(this, ...)</code>, link prototypes,
          then restore the child prototype's <code>constructor</code>.`,
      },
      {
        id: '2-5',
        title: 'Constructor Closure Privacy',
        badge: 'medium',
        desc: `Keep per-instance state private with a constructor closure and observe that
          methods using that state are recreated for every instance.`,
        hint: `Closure privacy is real privacy, but its privileged methods are instance properties.`,
      },
      {
        id: '2-6',
        title: 'WeakMap Privacy with Shared Methods',
        badge: 'hard',
        desc: `Store private per-instance state in a <code>WeakMap</code> while sharing the
          methods that access it through the prototype.`,
        hint: `Use each instance as a <code>WeakMap</code> key and keep the map outside the
          public object surface.`,
      },
      {
        id: '2-7',
        title: 'Constructor Static Members',
        badge: 'medium',
        desc: `Attach shared fields, utility methods, and factories directly to a constructor
          function rather than its prototype.`,
        hint: `Functions are objects, so constructor-level members are ordinary properties
          on the function and are not inherited by instances.`,
      },
    ],
  },
  {
    id: 'classes',
    title: '3. Classes',
    desc: 'Apply dedicated syntax for instances, accessors, inheritance, polymorphism, statics, and privacy.',
    exercises: [
      {
        id: '3-1',
        title: 'Class Fundamentals',
        badge: 'easy',
        desc: `Create class instances, compare public fields with shared methods, and inspect
          the prototype behavior behind class syntax.`,
        hint: `Class methods live on the prototype and are non-enumerable; public fields are
          initialized as own instance properties.`,
      },
      {
        id: '3-2',
        title: 'Class Getters and Setters',
        badge: 'medium',
        desc: `Expose computed properties and route assignments through validating setters.`,
        hint: `Assign through setters in the constructor so initial and later values follow
          the same validation path.`,
      },
      {
        id: '3-3',
        title: 'Class Inheritance and super',
        badge: 'medium',
        desc: `Extend a base class, initialize parent state with <code>super()</code>, and
          enhance an overridden method with <code>super.method()</code>.`,
        hint: `A derived constructor must call <code>super()</code> before using <code>this</code>.`,
      },
      {
        id: '3-4',
        title: 'Abstraction, Duck Typing, and Polymorphism',
        badge: 'hard',
        desc: `Define an abstract-style method contract and process class instances and a
          plain object uniformly through their shared <code>getArea()</code> interface.`,
        hint: `JavaScript does not require a formal interface: compatible behavior is often
          enough—commonly called duck typing.`,
      },
      {
        id: '3-5',
        title: 'Class Static Fields and Methods',
        badge: 'medium',
        desc: `Use class-level configuration, shared counters, factories, and inherited
          static behavior that remains unavailable on instances.`,
        hint: `Inside a static method, <code>this</code> refers to the class used for the call.`,
      },
      {
        id: '3-6',
        title: 'Private Instance and Static Fields',
        badge: 'hard',
        desc: `Combine a private instance balance with a private static ID counter and expose
          only selected information through public methods and getters.`,
        hint: `Use <code>#field</code> for instance privacy and
          <code>static #field</code> for class-level privacy.`,
      },
    ],
  },
  {
    id: 'design',
    title: '4. Object Design Patterns',
    desc: 'Choose between reusable capabilities, inheritance, and simple utility namespaces.',
    exercises: [
      {
        id: '4-1',
        title: 'Composition Over Inheritance',
        badge: 'hard',
        desc: `Build objects from small reusable capabilities so unrelated objects can share
          selected behavior without joining the same inheritance hierarchy.`,
        hint: `Composition answers “what can this object do?” instead of only “what is it?”`,
      },
      {
        id: '4-2',
        title: 'Plain Object Utility Namespace',
        badge: 'easy',
        desc: `Group configuration and stateless utility behavior on one object when instances,
          inheritance, and private per-instance state are unnecessary.`,
        hint: `These members are static-like, but plain objects have no class/instance distinction.`,
      },
      {
        id: '4-3',
        title: 'From Plain Objects to Constructors and Classes',
        badge: 'medium',
        desc: `Implement the same <strong>Person</strong> model as a plain object,
          constructor function, and class. Compare repeatable instances, shared methods,
          <code>instanceof</code>, static members, and private fields.`,
        hint: `No pattern is universally better. Move to constructors when you need many
          identifiable instances, and prefer class syntax when its clearer methods,
          inheritance, static members, or <code>#private</code> fields help your design.`,
      },
    ],
  },
];

const exercises = curriculum.flatMap(({ exercises: sectionExercises }) => sectionExercises);
const exerciseIds = exercises.map(({ id }) => id);

if (new Set(exerciseIds).size !== exerciseIds.length) {
  throw new Error('[oop-practice] duplicate id in curriculum');
}
for (const id of exerciseIds) {
  if (!Object.hasOwn(starters, id)) throw new Error(`[oop-practice] missing starter ${id}`);
  if (!Object.hasOwn(tests, id)) throw new Error(`[oop-practice] missing test ${id}`);
}
for (const id of [...Object.keys(starters), ...Object.keys(tests)]) {
  if (!exerciseIds.includes(id)) throw new Error(`[oop-practice] unlisted source ${id}`);
}

const BADGE_LABELS = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };

function renderExercise({ id, title, badge, desc, hint }) {
  const card = document.createElement('article');
  card.className = 'exercise';
  card.dataset.exercise = id;
  card.innerHTML = `
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

  mountCodePlayground(card, {
    code: starters[id],
    test: tests[id],
    label: `Code editor for exercise ${id}: ${title}`,
  });
  return card;
}

function renderSection({ id, title, desc }) {
  const heading = document.createElement('header');
  heading.className = 'curriculum-section';
  heading.id = `section-${id}`;
  heading.innerHTML = `<h2>${title}</h2><p>${desc}</p>`;
  return heading;
}

const container = document.querySelector('.container');
for (const curriculumSection of curriculum) {
  container.append(renderSection(curriculumSection));
  for (const exercise of curriculumSection.exercises) {
    container.append(renderExercise(exercise));
  }
}
