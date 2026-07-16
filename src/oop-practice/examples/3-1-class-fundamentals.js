class Person {
  role = 'person';

  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const tony = new Person('Tony', 'Stark');
const bruce = new Person('Bruce', 'Banner');

console.log('--- Class Fundamentals ---');
console.log(tony.getName());
console.log('instance field is own:', Object.hasOwn(tony, 'role'));
console.log('method is own:', Object.hasOwn(tony, 'getName'));
console.log('method shared:', tony.getName === bruce.getName);
console.log('instanceof Person:', tony instanceof Person);
