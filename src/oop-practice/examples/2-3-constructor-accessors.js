function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Object.defineProperty(Person.prototype, 'name', {
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  set(value) {
    if (typeof value !== 'string') return;
    const [firstName, ...lastNameParts] = value.trim().split(/\s+/);
    if (!firstName || lastNameParts.length === 0) return;
    this.firstName = firstName;
    this.lastName = lastNameParts.join(' ');
  },
  enumerable: false,
  configurable: true,
});

const person = new Person('Tony', 'Stark');
person.name = 'Reed van Richards';
const descriptor = Object.getOwnPropertyDescriptor(Person.prototype, 'name');

console.log('--- Constructor Prototype Accessor ---');
console.log('name:', person.name);
console.log('own accessor:', Object.hasOwn(person, 'name'));
console.log('enumerable:', descriptor.enumerable);
