import './style.css';

const demos = [
  {
    icon: '🎯',
    title: 'Learn CSS Grid',
    desc: 'Build confidence with tracks, areas, alignment, and responsive grid exercises.',
    href: '/src/grid/grid.html',
    category: 'CSS',
  },
  {
    icon: '✨',
    title: 'Height Animations',
    desc: 'Explore smooth height transitions for accordions, dropdowns, and other expanding UI.',
    href: '/src/height-animation/height-animation.html',
    category: 'CSS',
  },
  {
    icon: '💡',
    title: 'Tooltip',
    desc: 'Load tooltip content on demand and reveal it for both pointer and keyboard users.',
    href: '/src/tooltip/tooltip.html',
    category: 'Components',
  },
  {
    icon: '📝',
    title: 'Sample Inputs',
    desc: 'Use a practical reference of native, accessible HTML form controls.',
    href: '/src/sample-input/sample-input.html',
    category: 'HTML',
  },
  {
    icon: '📊',
    title: 'Progress Bar Basics',
    desc: 'Create and animate progress indicators with a small, focused DOM example.',
    href: '/src/progress-bar/progress-bar.html',
    category: 'Components',
  },
  {
    icon: '🚦',
    title: 'Throttled Progress Queue',
    desc: 'Limit concurrent animations with a queue whose completion is driven by a timer.',
    href: '/src/progress-bar-with-throttle/progress-bar-with-throttle.html',
    category: 'JavaScript',
  },
  {
    icon: '🔁',
    title: 'Event-Driven Progress Queue',
    desc: 'Advance the same concurrency-limited queue using the CSS transitionend event.',
    href: '/src/progress-bar-with-transitionend/progress-bar-with-transitionend.html',
    category: 'JavaScript',
  },
  {
    icon: '💬',
    title: 'Chat App',
    desc: 'Experiment with a compact chat interface, message form, and interactive conversation.',
    href: '/src/chat-app/chat-app.html',
    category: 'Components',
  },
  {
    icon: '🧬',
    title: 'OOP Practice',
    desc: 'Practice prototypes, classes, inheritance, encapsulation, and composition in the browser.',
    href: '/src/oop-practice/oop-practice.html',
    category: 'JavaScript',
  },
  {
    icon: '⏳',
    title: 'Promise Practice',
    desc: 'Work through promises, async/await, error handling, concurrency, and composition.',
    href: '/src/promise-practice/promise-practice.html',
    category: 'JavaScript',
  },
  {
    icon: '🗺️',
    title: 'Holy Grail: Named Areas',
    desc: 'Build the classic header, columns, and footer layout with named CSS Grid areas.',
    href: '/src/holy-grail/holy-grail.html',
    category: 'Layouts',
  },
  {
    icon: '📐',
    title: 'Holy Grail: Grid Lines',
    desc: 'Recreate the same responsive layout using explicit grid rows and column lines.',
    href: '/src/holy-grail-2/holy-grail.html',
    category: 'Layouts',
  },
];

const categories = ['All', ...new Set(demos.map(({ category }) => category))];
const app = document.querySelector('#app');

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

const header = createElement('header', 'site-header');
const eyebrow = createElement('p', 'eyebrow', 'Frontend Lab · 12 hands-on demos');
const heading = createElement('h1', null, 'Learn by changing the code.');
const intro = createElement(
  'p',
  'intro',
  'A growing collection of focused browser experiments. Pick a topic, inspect the implementation, and make it your own.',
);
header.append(eyebrow, heading, intro);

const main = createElement('main');
const catalogHeading = createElement('h2', null, 'Explore the lab');
catalogHeading.id = 'catalog-heading';

const filterBar = createElement('div', 'filters');
filterBar.setAttribute('aria-label', 'Filter demos by topic');

const grid = createElement('div', 'demo-grid');
const emptyState = createElement('p', 'empty-state', 'No demos match this topic yet.');
emptyState.hidden = true;

const createCard = ({ icon, title, desc, href, category }) => {
  const article = createElement('article', 'card');
  article.dataset.category = category;

  const top = createElement('div', 'card-top');
  const iconEl = createElement('span', 'card-icon', icon);
  iconEl.setAttribute('aria-hidden', 'true');
  const tag = createElement('span', 'tag', category);
  top.append(iconEl, tag);

  const cardHeading = createElement('h3', null, title);
  const description = createElement('p', null, desc);
  const link = createElement('a', 'card-link', 'Open demo');
  link.href = href;
  link.setAttribute('aria-label', `Open ${title} demo`);
  const arrow = createElement('span', null, ' →');
  arrow.setAttribute('aria-hidden', 'true');
  link.append(arrow);

  article.append(top, cardHeading, description, link);
  return article;
};

for (const demo of demos) grid.append(createCard(demo));

const setCategory = (selectedCategory) => {
  let visibleCount = 0;
  for (const card of grid.children) {
    const visible = selectedCategory === 'All' || card.dataset.category === selectedCategory;
    card.hidden = !visible;
    if (visible) visibleCount++;
  }
  emptyState.hidden = visibleCount > 0;

  for (const button of filterBar.children) {
    button.setAttribute('aria-pressed', String(button.dataset.category === selectedCategory));
  }
};

for (const category of categories) {
  const count = category === 'All'
    ? demos.length
    : demos.filter((demo) => demo.category === category).length;
  const button = createElement('button', 'filter', `${category} ${count}`);
  button.type = 'button';
  button.dataset.category = category;
  button.setAttribute('aria-pressed', String(category === 'All'));
  button.addEventListener('click', () => setCategory(category));
  filterBar.append(button);
}

const catalog = createElement('section', 'catalog');
catalog.setAttribute('aria-labelledby', 'catalog-heading');
catalog.append(catalogHeading, filterBar, grid, emptyState);
main.append(catalog);

const footer = createElement('footer', 'site-footer');
footer.append(createElement('p', null, 'Small experiments. Clear fundamentals. Built for curiosity.'));

app.append(header, main, footer);
