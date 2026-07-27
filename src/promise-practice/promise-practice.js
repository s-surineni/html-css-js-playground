// Promise Practice — live editable curriculum.
// Metadata lives below; starter and assertion files are loaded by their numeric ID.
import { mountCodePlayground } from '../lib/code-playground.js';
import '../lib/code-playground.css';

const rawById = (modules, kind) => {
  const sources = {};
  for (const [path, source] of Object.entries(modules)) {
    const id = path.match(/\/(\d+-\d+)-/)?.[1];
    if (!id) continue;
    if (Object.hasOwn(sources, id)) {
      throw new Error(`[promise-practice] duplicate ${kind} id "${id}" from ${path}`);
    }
    sources[id] = source.trimEnd();
  }
  return sources;
};

const starters = rawById(
  import.meta.glob(
    ['./examples/*.js', '!./examples/*-without-promises.js'],
    { query: '?raw', import: 'default', eager: true },
  ),
  'starter',
);
const tests = rawById(
  import.meta.glob('./tests/*.js', { query: '?raw', import: 'default', eager: true }),
  'test',
);

const curriculum = [
  {
    id: 'promises',
    title: '1. Promise Fundamentals',
    desc: 'Start with creating promises, observe states, and learn basic chaining and error handling.',
    exercises: [
      {
        id: '1-1',
        title: 'Creating and Resolving a Promise',
        badge: 'easy',
        desc: `Create a promise that resolves with a value and observe how
          <code>then</code> receives the resolved result.`,
        hint: `<code>new Promise((resolve, reject) => ...)</code> executor
          controls when and with what value the promise settles.`,
      },
      {
        id: '1-2',
        title: 'Promise States and Chaining',
        badge: 'easy',
        desc: `Chain multiple <code>then</code> calls and see how the return
          value of each handler flows into the next.`,
        hint: `Returning a value from <code>then</code> wraps it in a resolved
          promise for the next handler.`,
      },
      {
        id: '1-3',
        title: 'Promise Error Handling',
        badge: 'easy',
        desc: `Handle rejections with <code>catch</code> and observe how
          errors propagate through a chain.`,
        hint: `A rejection skips all intermediate <code>then</code> handlers
          until it reaches a <code>catch</code>.`,
      },
      {
        id: '1-4',
        title: 'Chaining with Async Values',
        badge: 'medium',
        desc: `Return a new promise from a <code>then</code> handler and
          continue chaining, demonstrating that promises flatten nested
          promise results automatically.`,
        hint: `Returning a promise from <code>then</code> causes the chain
          to wait for it before proceeding.`,
      },
      {
        id: '1-5',
        title: 'Promise.all for Parallel Execution',
        badge: 'medium',
        desc: `Run multiple independent promises in parallel with
          <code>Promise.all</code> and collect all results at once.`,
        hint: `<code>Promise.all</code> resolves when every input promise
          resolves, or rejects immediately on the first failure.`,
      },
    ],
  },
  {
    id: 'async',
    title: '2. Async/Await',
    desc: 'Use async functions and await to write asynchronous code that reads like synchronous code.',
    exercises: [
      {
        id: '2-1',
        title: 'Async Function Basics',
        badge: 'easy',
        desc: `Write an <code>async</code> function that returns a value and
          observe that the return value is automatically wrapped in a
          promise.`,
        hint: `An async function always returns a promise. Returning a value
          is equivalent to resolving the promise with that value.`,
      },
      {
        id: '2-2',
        title: 'Awaiting Promises',
        badge: 'easy',
        desc: `Use <code>await</code> to pause execution until a promise
          settles, then use the resolved value directly.`,
        hint: `<code>await</code> can only be used inside an async function
          or at the top level of an ES module.`,
      },
      {
        id: '2-3',
        title: 'Error Handling with Try/Catch',
        badge: 'medium',
        desc: `Wrap <code>await</code> expressions in <code>try/catch</code>
          to handle rejections with the familiar synchronous error-handling
          pattern.`,
        hint: `A rejected promise thrown by <code>await</code> is caught by
          the <code>catch</code> block just like a thrown error.`,
      },
      {
        id: '2-4',
        title: 'Sequential vs Parallel Execution',
        badge: 'medium',
        desc: `Compare running async operations one after another with
          running them in parallel using <code>Promise.all</code> and
          <code>await</code>.`,
        hint: `Sequential awaits add up the wait times; parallel awaits
          take the time of the slowest operation.`,
      },
      {
        id: '2-5',
        title: 'Async Iteration with for await...of',
        badge: 'hard',
        desc: `Use <code>for await...of</code> to iterate over an async
          iterable and process each value as it becomes available.`,
        hint: `An async generator function (<code>async function*</code>)
          produces an async iterable that <code>for await...of</code> can consume.`,
      },
    ],
  },
  {
    id: 'advanced',
    title: '3. Advanced Promise Patterns',
    desc: 'Explore race conditions, settling strategies, and composition patterns for promises.',
    exercises: [
      {
        id: '3-1',
        title: 'Promise.race for Timeout Patterns',
        badge: 'medium',
        desc: `Use <code>Promise.race</code> to implement a timeout that
          rejects if a promise does not settle within a given duration.`,
        hint: `<code>Promise.race</code> settles as soon as any of the
          input promises settles, whether fulfilled or rejected.`,
      },
      {
        id: '3-2',
        title: 'Promise.allSettled for Best-Effort Collection',
        badge: 'medium',
        desc: `Run multiple promises and collect all outcomes (both fulfilled
          and rejected) with <code>Promise.allSettled</code>.`,
        hint: `Unlike <code>Promise.all</code>, <code>allSettled</code>
          waits for every promise to settle and never short-circuits.`,
      },
      {
        id: '3-3',
        title: 'Promise.any for First Success',
        badge: 'hard',
        desc: `Use <code>Promise.any</code> to wait for the first promise
          that fulfills, ignoring all rejections until one succeeds.`,
        hint: `<code>Promise.any</code> rejects with an
          <code>AggregateError</code> only when every input promise rejects.`,
      },
      {
        id: '3-4',
        title: 'Composing Async Functions',
        badge: 'hard',
        desc: `Build a pipeline of async functions that each transform data,
          demonstrating how async/await simplifies composing asynchronous
          operations.`,
        hint: `Each async function in the pipeline can await the result of
          the previous one, making the flow easy to read and debug.`,
      },
    ],
  },
];

const exercises = curriculum.flatMap(({ exercises: sectionExercises }) => sectionExercises);
const exerciseIds = exercises.map(({ id }) => id);

if (new Set(exerciseIds).size !== exerciseIds.length) {
  throw new Error('[promise-practice] duplicate id in curriculum');
}
for (const id of exerciseIds) {
  if (!Object.hasOwn(starters, id)) throw new Error(`[promise-practice] missing starter ${id}`);
  if (!Object.hasOwn(tests, id)) throw new Error(`[promise-practice] missing test ${id}`);
}
for (const id of [...Object.keys(starters), ...Object.keys(tests)]) {
  if (!exerciseIds.includes(id)) throw new Error(`[promise-practice] unlisted source ${id}`);
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
