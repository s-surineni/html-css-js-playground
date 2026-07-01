// demonstrates inhertance

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

// Person.prototype.getName = function() {
//   return `${this.firstName} ${this.lastName}`
// }
// The get keyword only works inside object literals or class definitions, not when directly assigning to a prototype property.
// Object.defineProperty(Person.prototype, 'name', {
//   get: function() {
//     return `${this.firstName} ${this.lastName}`;
//   }
// });


Person.prototype = {
  getName: function () {
    return `${this.firstName} ${this.lastName}`
  },
  get name() {
    return `${this.firstName} ${this.lastName}`
  },
  set name(params) {
    const [firstName, lastName] = params.split(' ')
    this.firstName = firstName
    this.lastName = lastName
  }
}

function SuperHero(firstName, lastName, power) {
  Person.call(this, firstName, lastName)
  this.power = power;
}
SuperHero.prototype = Object.create(Person.prototype)
SuperHero.prototype.constructor = SuperHero

// child-specific methods go AFTER step 1 (or they'd be wiped out):
SuperHero.prototype.describe = function() {
  return`${this.firstName} ${this.lastName} ${this.power}`
};
const p1 = new Person('Tony', 'Stark')
console.log(p1.getName());
console.log('ironman p1.name', p1.name);
p1.name = 'Reed Richards'
console.log('ironman p1.name', p1.name);
const s1 = new SuperHero("Tony", 'Startk', 'Suite')
console.log('ironman s1.describe()', s1.describe());