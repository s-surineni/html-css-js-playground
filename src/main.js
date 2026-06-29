import './style.css'

// Each demo lives in src/<feature>/<feature>.html. Add a demo by adding one
// entry here — the card grid is rendered from this list.
const demos = [
  {
    icon: '🎯',
    title: 'Learn CSS Grid',
    desc: 'Master CSS Grid Layout with interactive examples and practice exercises',
    href: '/src/grid/grid.html',
    cta: 'Start Learning Grid →',
  },
  {
    icon: '✨',
    title: 'Height Animations',
    desc: 'Components with smooth height transitions — accordions, dropdowns, and more',
    href: '/src/height-animation/height-animation.html',
    cta: 'View Animations →',
  },
  {
    icon: '💬',
    title: 'Tooltip',
    desc: 'CSS-only tooltip that lazy-loads its content on hover/focus',
    href: '/src/tooltip/tooltip.html',
    cta: 'View Tooltip →',
  },
  {
    icon: '📝',
    title: 'Sample Inputs',
    desc: 'A quick reference of common, accessible HTML form controls',
    href: '/src/sample-input/sample-input.html',
    cta: 'View Inputs →',
  },
  {
    icon: '📊',
    title: 'Progress Bar',
    desc: 'Interactive progress bar demonstrations and examples',
    href: '/src/progress-bar/progress-bar.html',
    cta: 'View Progress Bar →',
  },
  {
    icon: '📊',
    title: 'Progress Bar With Throttle',
    desc: 'Concurrency-limited progress bars driven by a timeout-based queue',
    href: '/src/progress-bar-with-throttle/progress-bar-with-throttle.html',
    cta: 'View Progress Bar →',
  },
  {
    icon: '📊',
    title: 'Progress Bar With transitionend',
    desc: 'Same queue, advanced by the CSS transitionend event instead of a timeout',
    href: '/src/progress-bar-with-transitionend/progress-bar-with-transitionend.html',
    cta: 'View Progress Bar →',
  },
  {
    icon: '💬',
    title: 'Chat App',
    desc: 'A small interactive chat interface demo',
    href: '/src/chat-app/chat-app.html',
    cta: 'Open Chat App →',
  },
  {
    icon: '🧬',
    title: 'OOP Practice',
    desc: 'Practice JavaScript OOP concepts — classes, inheritance, getters/setters, static methods, private fields, and polymorphism',
    href: '/src/oop-practice/oop-practice.html',
    cta: 'Start Practicing →',
  },
]

const card = ({ icon, title, desc, href, cta }) => `
    <div class="card">
      <h2>${icon} ${title}</h2>
      <p>${desc}</p>
      <a href="${href}">${cta}</a>
    </div>`

document.querySelector('#app').innerHTML = `
  <div>${demos.map(card).join('')}</div>
`
