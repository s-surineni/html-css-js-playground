// =====================================
// 🧬 OOP PRACTICE — Fill in the code!
// =====================================
// Each exercise has a stub class below.
// Replace /* TODO */ with working code.
// Then click "Run" on the page to test.
// =====================================

// ---------- Exercise 1: Classes & Constructors ----------

class Book {
  // TODO: constructor(title, author, year)
  constructor(/* TODO */) {
    // TODO: assign this.title, this.author, this.year
  }

  // TODO: getInfo() — return `${title} by ${author} (${year})`
  getInfo() {
    /* TODO */
  }
}

// ---------- Exercise 2: Inheritance (extends) ----------

class LibraryBook /* TODO: extends Book */ {
  // TODO: constructor(title, author, year)
  constructor(/* TODO */) {
    // TODO: call super(title, author, year)
    // TODO: this.isBorrowed = false
  }

  // TODO: borrow() — sets isBorrowed = true, returns a string
  borrow() {
    /* TODO */
  }

  // TODO: returnBook() — sets isBorrowed = false, returns a string
  returnBook() {
    /* TODO */
  }

  // TODO: getInfo() — override Book's method, include borrow status
  getInfo() {
    /* TODO */
  }
}

// ---------- Exercise 3: Getters & Setters ----------

class Rectangle {
  // TODO: constructor(width, height) — assign to _width, _height
  constructor(/* TODO */) {
    /* TODO */
  }

  // TODO: get area() — return width * height
  get area() {
    /* TODO */
  }

  // TODO: get perimeter() — return 2 * (width + height)
  get perimeter() {
    /* TODO */
  }

  // TODO: set width(value) — only set _width if value > 0
  set width(value) {
    /* TODO */
  }

  // TODO: get width() — return _width
  get width() {
    /* TODO */
  }
}

// ---------- Exercise 4: Static Methods ----------

class TemperatureConverter {
  // TODO: static FACTOR = 9/5
  static FACTOR; // assign inside the method body or here

  // TODO: static celsiusToFahrenheit(celsius)
  static celsiusToFahrenheit(celsius) {
    /* TODO */
  }

  // TODO: static fahrenheitToCelsius(fahrenheit)
  static fahrenheitToCelsius(fahrenheit) {
    /* TODO */
  }
}

// ---------- Exercise 5: Private Fields ----------

class BankAccount {
  // TODO: declare private field #balance
  #balance; // declare private field here

  // TODO: constructor(owner, initialBalance)
  constructor(/* TODO */) {
    this.owner = owner;
    // TODO: this.#balance = initialBalance
  }

  // TODO: deposit(amount) — add to #balance if amount > 0
  deposit(amount) {
    /* TODO */
  }

  // TODO: withdraw(amount) — subtract if amount <= #balance
  withdraw(amount) {
    /* TODO */
  }

  // TODO: get balance() — return #balance
  get balance() {
    /* TODO */
  }
}

// ---------- Exercise 6: Polymorphism ----------

class Shape {
  // TODO: getArea() — return 0
  getArea() {
    /* TODO */
  }
}

class Circle /* TODO: extends Shape */ {
  // TODO: constructor(radius)
  constructor(/* TODO */) {
    // TODO: call super()
    // TODO: this.radius = radius
  }

  // TODO: getArea() — π * r²  (use Math.PI)
  getArea() {
    /* TODO */
  }
}

class Square /* TODO: extends Shape */ {
  // TODO: constructor(side)
  constructor(/* TODO */) {
    // TODO: call super()
    // TODO: this.side = side
  }

  // TODO: getArea() — side * side
  getArea() {
    /* TODO */
  }
}

// =====================================
// TEST RUNNER — do not edit below
// =====================================

function getOutput(id) {
  return document.getElementById('output' + id);
}

// Helper to check if a function is user-defined (not a stub)
function isImplemented(fn) {
  if (typeof fn !== 'function') return false;
  const src = fn.toString();
  // If the body still contains the literal "/* TODO */" it's not done
  return !src.includes('/* TODO */');
}

window.objectOOP = function() {
  const person = {
    firstName: 'Tony',
    lastName: 'Stark',
    getName: function () {
      return `${this.firstName} ${this.lastName}`
    }
  }
  console.log(person.getName())

  const superHero = {}
  Object.setPrototypeOf(superHero, person);
  superHero.firstName = 'Iron'
  superHero.lastName = 'Man'
  console.log(superHero.getName())
}

window.runExercise = function (num) {
  const out = getOutput(num);
  try {
    switch (num) {
      case 1:
        if (!isImplemented(Book.prototype.getInfo)) {
          out.textContent = '⚠️ Book.getInfo() still has /* TODO */ in it. Fill it in first!';
          return;
        }
        const b = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 1925);
        out.textContent = '✅ ' + b.getInfo();
        break;

      case 2:
        if (typeof LibraryBook === 'undefined') {
          out.textContent = '⚠️ LibraryBook class not found. Did you write "extends Book"?';
          return;
        }
        const lb = new LibraryBook('1984', 'George Orwell', 1949);
        let msg = '✅ ' + lb.getInfo() + '\n';
        msg += '📕 borrow: ' + lb.borrow() + '\n';
        msg += '📗 return: ' + lb.returnBook();
        out.textContent = msg;
        break;

      case 3:
        if (!isImplemented(Rectangle.prototype.area)) {
          out.textContent = '⚠️ Rectangle getters still have /* TODO */ in them. Fill them in first!';
          return;
        }
        const r = new Rectangle(10, 5);
        let s = '✅ area = ' + r.area + ', perimeter = ' + r.perimeter + '\n';
        r.width = 20;
        s += '✅ after width=20 → area = ' + r.area;
        out.textContent = s;
        break;

      case 4:
        if (!isImplemented(TemperatureConverter.celsiusToFahrenheit)) {
          out.textContent = '⚠️ TemperatureConverter.celsiusToFahrenheit still has /* TODO */ in it. Fill it in first!';
          return;
        }
        const c = 25, f = 77;
        const r1 = TemperatureConverter.celsiusToFahrenheit(c);
        const r2 = TemperatureConverter.fahrenheitToCelsius(f);
        out.textContent = `✅ ${c}°C = ${r1.toFixed(1)}°F\n✅ ${f}°F = ${r2.toFixed(1)}°C`;
        break;

      case 5:
        const acct = new BankAccount('Alice', 1000);
        let log = '✅ balance = $' + acct.balance + '\n';
        log += '✅ deposit(500): ' + acct.deposit(500) + '\n';
        log += '✅ withdraw(200): ' + acct.withdraw(200) + '\n';
        log += '✅ final balance = $' + acct.balance;
        out.textContent = log;
        break;

      case 6:
        const shapes = [new Circle(5), new Square(4)];
        let poly = '';
        shapes.forEach((s, i) => {
          poly += `✅ ${s.constructor.name} area = ${s.getArea().toFixed(2)}\n`;
        });
        out.textContent = poly;
        break;
    }
  } catch (e) {
    out.textContent = '❌ Error: ' + e.message + '\nCheck your implementation.';
  }
};

console.log('🧬 OOP Practice loaded — edit oop-practice.js and click Run!');