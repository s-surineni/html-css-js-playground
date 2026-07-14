function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;

  // Each instance receives a different greet function.
  this.greet = function() {
    return `Hello, I'm ${this.firstName} ${this.lastName}!`;
  };
}

// All instances share one getName function through Person.prototype.
Person.prototype.getName = function() {
  return `${this.firstName} ${this.lastName}`;
};

const p1 = new Person('Tony', 'Stark');
const p2 = new Person('Bruce', 'Banner');
console.log(p1.getName());
console.log(p1.greet());
console.log('shared getName:', p1.getName === p2.getName);
console.log('separate greet:', p1.greet !== p2.greet);
console.log('p1 instanceof Person:', p1 instanceof Person);
console.log('prototype link:', Object.getPrototypeOf(p1) === Person.prototype);

// Conceptually, `new Person(...)` performs these steps:
const manualPerson = Object.create(Person.prototype);
Person.call(manualPerson, 'Natasha', 'Romanoff');
console.log('manual construction:', manualPerson.getName());

// Avoid arrow functions for methods that need dynamic `this`: arrows capture
// `this` from their surrounding scope instead of receiving the calling object.
function createArrowMethodExample() {
  return { value: 42, readValue: () => this.value };
}
const arrowMethodExample = createArrowMethodExample.call({ value: 'captured value' });
console.log('arrow method reads object value:', arrowMethodExample.readValue());
