// demonstrates getter and setter

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

function SuperHero(power) {
  this.power = power;
}
const p1 = new Person('Tony', 'Stark')
console.log(p1.getName());
console.log('ironman p1.name', p1.name);
p1.name = 'Reed Richards'
console.log('ironman p1.name', p1.name);
