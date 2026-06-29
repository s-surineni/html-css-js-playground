// =====================================
// 🧬 OOP PRACTICE — live editable playground
// =====================================
// The editor/run/output machinery lives in the reusable code-playground module;
// this file only holds the exercise data and mounts one playground per card.
// =====================================

import { mountCodePlayground } from '../lib/code-playground.js';
import '../lib/code-playground.css';

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

// Mount one editable playground per exercise card.
document.querySelectorAll('section.exercise[data-exercise]').forEach((section) => {
  const exercise = exercises[section.dataset.exercise];
  if (!exercise) return;
  mountCodePlayground(section, {
    code: exercise.starter,
    test: exercise.test,
    label: `Code editor for exercise ${section.dataset.exercise}`,
  });
});

console.log('🧬 OOP Practice loaded — edit the code on the page and click Run!');
