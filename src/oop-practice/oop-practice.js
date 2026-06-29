// =====================================
// 🧬 OOP PRACTICE — live editable playground
// =====================================
// Each exercise renders an editable code box. Click "Run" to evaluate the code
// you typed (via `new Function`), run a small test against it, and see the
// output — console.log included. "Reset" restores the starter code.
// =====================================

// Each exercise: starter code the user edits, plus a `test` snippet that
// exercises the classes/objects the starter defines and returns a string to
// display. The test runs in the same scope as the starter, so it can see
// everything the starter declares.
const exercises = {
  1: {
    starter: `// Prototype-based OOP on plain objects.
const person = {
  firstName: 'Tony',
  lastName: 'Stark',
  getName: function () {
    return \`\${this.firstName} \${this.lastName}\`;
  },
};
console.log(person.getName());

const superHero = {};
Object.setPrototypeOf(superHero, person);
superHero.firstName = 'Iron';
superHero.lastName = 'Man';
console.log(superHero.getName());`,
    test: '',
  },

  2: {
    starter: `class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }
  getInfo() {
    return \`\${this.title} by \${this.author} (\${this.year})\`;
  }
}

class LibraryBook extends Book {
  constructor(title, author, year) {
    super(title, author, year);
    this.isBorrowed = false;
  }
  borrow() {
    this.isBorrowed = true;
    return \`Borrowed "\${this.title}"\`;
  }
  returnBook() {
    this.isBorrowed = false;
    return \`Returned "\${this.title}"\`;
  }
  getInfo() {
    return \`\${super.getInfo()} — \${this.isBorrowed ? 'borrowed' : 'available'}\`;
  }
}`,
    test: `const lb = new LibraryBook('1984', 'George Orwell', 1949);
let msg = lb.getInfo() + '\\n';
msg += 'borrow: ' + lb.borrow() + '\\n';
msg += 'return: ' + lb.returnBook();
return msg;`,
  },

  3: {
    starter: `class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }
  get area() {
    return this._width * this._height;
  }
  get perimeter() {
    return 2 * (this._width + this._height);
  }
  set width(value) {
    if (value > 0) this._width = value;
  }
  get width() {
    return this._width;
  }
}`,
    test: `const r = new Rectangle(10, 5);
let s = 'area = ' + r.area + ', perimeter = ' + r.perimeter + '\\n';
r.width = 20;
s += 'after width=20 → area = ' + r.area;
return s;`,
  },

  4: {
    starter: `class TemperatureConverter {
  static FACTOR = 9 / 5;

  static celsiusToFahrenheit(celsius) {
    return celsius * TemperatureConverter.FACTOR + 32;
  }
  static fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) / TemperatureConverter.FACTOR;
  }
}`,
    test: `const c = 25, f = 77;
const r1 = TemperatureConverter.celsiusToFahrenheit(c);
const r2 = TemperatureConverter.fahrenheitToCelsius(f);
return \`\${c}°C = \${r1.toFixed(1)}°F\\n\${f}°F = \${r2.toFixed(1)}°C\`;`,
  },

  5: {
    starter: `class BankAccount {
  #balance;

  constructor(owner, initialBalance) {
    this.owner = owner;
    this.#balance = initialBalance;
  }
  deposit(amount) {
    if (amount > 0) this.#balance += amount;
    return \`+\${amount}\`;
  }
  withdraw(amount) {
    if (amount <= this.#balance) this.#balance -= amount;
    return \`-\${amount}\`;
  }
  get balance() {
    return this.#balance;
  }
}`,
    test: `const acct = new BankAccount('Alice', 1000);
let log = 'balance = $' + acct.balance + '\\n';
log += 'deposit(500): ' + acct.deposit(500) + '\\n';
log += 'withdraw(200): ' + acct.withdraw(200) + '\\n';
log += 'final balance = $' + acct.balance;
return log;`,
  },

  6: {
    starter: `class Shape {
  getArea() {
    return 0;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  getArea() {
    return Math.PI * this.radius ** 2;
  }
}

class Square extends Shape {
  constructor(side) {
    super();
    this.side = side;
  }
  getArea() {
    return this.side * this.side;
  }
}`,
    test: `const shapes = [new Circle(5), new Square(4)];
let poly = '';
shapes.forEach((s) => {
  poly += \`\${s.constructor.name} area = \${s.getArea().toFixed(2)}\\n\`;
});
return poly;`,
  },
};

// Format a console.log argument the way a dev console would.
function format(value) {
  if (typeof value === 'string') return value;
  if (value instanceof Error) return value.toString();
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

// Evaluate `userCode`, then run `test` in the same scope. Captures console.log
// output and either the test's return value or a thrown error.
function runCode(userCode, test) {
  const logs = [];
  const sandboxConsole = {
    log: (...args) => logs.push(args.map(format).join(' ')),
    error: (...args) => logs.push(args.map(format).join(' ')),
    warn: (...args) => logs.push(args.map(format).join(' ')),
  };
  try {
    // The test snippet is nested so it closes over everything userCode declares.
    const body = `${userCode}\n;return (function () {\n${test}\n})();`;
    const result = new Function('console', body)(sandboxConsole);
    return { logs, result, error: null };
  } catch (error) {
    return { logs, result: null, error };
  }
}

// Render the run result into an exercise's output panel.
function renderOutput(outputEl, userCode, test) {
  const { logs, result, error } = runCode(userCode, test);
  const lines = [...logs];
  if (typeof result === 'string' && result.length) lines.push(result);

  if (error) {
    outputEl.classList.add('has-error');
    const prefix = lines.length ? lines.join('\n') + '\n' : '';
    outputEl.textContent = `${prefix}❌ ${error.name}: ${error.message}`;
  } else {
    outputEl.classList.remove('has-error');
    outputEl.textContent = lines.length ? '✅ ' + lines.join('\n') : '✅ (no output)';
  }
}

// Build the editor UI inside each exercise card and wire up Run / Reset.
function mountEditor(section) {
  const id = section.dataset.exercise;
  const exercise = exercises[id];
  if (!exercise) return;

  const editor = document.createElement('textarea');
  editor.className = 'code-editor';
  editor.spellcheck = false;
  editor.value = exercise.starter;
  editor.setAttribute('aria-label', `Code editor for exercise ${id}`);
  // Tab inserts two spaces instead of moving focus out of the editor.
  editor.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const { selectionStart: start, selectionEnd: end, value } = editor;
    editor.value = value.slice(0, start) + '  ' + value.slice(end);
    editor.selectionStart = editor.selectionEnd = start + 2;
  });

  const output = document.createElement('div');
  output.className = 'output';
  output.textContent = 'Click Run to execute your code.';

  const runBtn = document.createElement('button');
  runBtn.type = 'button';
  runBtn.textContent = '▶ Run';
  runBtn.addEventListener('click', () => renderOutput(output, editor.value, exercise.test));

  const resetBtn = document.createElement('button');
  resetBtn.type = 'button';
  resetBtn.className = 'secondary';
  resetBtn.textContent = '↺ Reset';
  resetBtn.addEventListener('click', () => {
    editor.value = exercise.starter;
    output.classList.remove('has-error');
    output.textContent = 'Click Run to execute your code.';
  });

  const actions = document.createElement('div');
  actions.className = 'actions';
  actions.append(runBtn, resetBtn);

  section.append(editor, actions, output);
}

document.querySelectorAll('section.exercise[data-exercise]').forEach(mountEditor);

console.log('🧬 OOP Practice loaded — edit the code on the page and click Run!');
