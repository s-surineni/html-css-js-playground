// Constructor-function inheritance

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.getName = function() {
  return `${this.firstName} ${this.lastName}`;
};

function SuperHero(firstName, lastName, power) {
  Person.call(this, firstName, lastName);
  this.power = power;
}
SuperHero.prototype = Object.create(Person.prototype);
Object.defineProperty(SuperHero.prototype, 'constructor', {
  value: SuperHero,
  writable: true,
  configurable: true,
});

// child-specific methods go AFTER step 1 (or they'd be wiped out):
SuperHero.prototype.describe = function() {
  return `${this.getName()} uses ${this.power}`;
};

const hero = new SuperHero('Tony', 'Stark', 'Suit');
console.log(hero.describe());
console.log('hero instanceof SuperHero:', hero instanceof SuperHero);
console.log('hero instanceof Person:', hero instanceof Person);
