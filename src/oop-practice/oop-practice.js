// =====================================
// 🧬 OOP PRACTICE — live editable playground
// =====================================
// Starter code for each exercise lives as a real, lint-able file under
// examples/<n>-name.js and is imported as raw source (no escaping). This file
// only holds the per-exercise test snippets and mounts one playground per card.
// =====================================

import { mountCodePlayground } from '../lib/code-playground.js';
import '../lib/code-playground.css';

// Load every starter file as raw source text. Keyed by path, e.g.
// './examples/2-inheritance.js'. The leading number maps to the exercise id.
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

// Test snippet per exercise: runs in the same scope as the starter and returns
// a string to display. Kept inline since they're short; only the bulky class
// code lives in files.
const tests = {
  1: '',
  2: `const lb = new LibraryBook('1984', 'George Orwell', 1949);
let msg = lb.getInfo() + '\\n';
msg += 'borrow: ' + lb.borrow() + '\\n';
msg += 'return: ' + lb.returnBook();
return msg;`,
  3: `const r = new Rectangle(10, 5);
let s = 'area = ' + r.area + ', perimeter = ' + r.perimeter + '\\n';
r.width = 20;
s += 'after width=20 → area = ' + r.area;
return s;`,
  4: `const c = 25, f = 77;
const r1 = TemperatureConverter.celsiusToFahrenheit(c);
const r2 = TemperatureConverter.fahrenheitToCelsius(f);
return \`\${c}°C = \${r1.toFixed(1)}°F\\n\${f}°F = \${r2.toFixed(1)}°C\`;`,
  5: `const acct = new BankAccount('Alice', 1000);
let log = 'balance = $' + acct.balance + '\\n';
log += 'deposit(500): ' + acct.deposit(500) + '\\n';
log += 'withdraw(200): ' + acct.withdraw(200) + '\\n';
log += 'final balance = $' + acct.balance;
return log;`,
  6: `const shapes = [new Circle(5), new Square(4)];
let poly = '';
shapes.forEach((s) => {
  poly += \`\${s.constructor.name} area = \${s.getArea().toFixed(2)}\\n\`;
});
return poly;`,
};

// Mount one editable playground per exercise card.
document.querySelectorAll('section.exercise[data-exercise]').forEach((section) => {
  const id = section.dataset.exercise;
  const starter = starters[id];
  if (!starter) return;
  mountCodePlayground(section, {
    code: starter,
    test: tests[id] ?? '',
    label: `Code editor for exercise ${id}`,
  });
});

console.log('🧬 OOP Practice loaded — edit the code on the page and click Run!');
