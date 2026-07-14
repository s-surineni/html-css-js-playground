function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.getName = function() {
  return `${this.firstName} ${this.lastName}`;
};

// Assignment cannot express an accessor. Define it with a property descriptor
// without replacing Person.prototype (which would lose its constructor link).
Object.defineProperty(Person.prototype, 'name', {
  get() {
    return this.getName();
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

const p1 = new Person('Tony', 'Stark');
console.log(p1.getName());
console.log('p1.name:', p1.name);
p1.name = 'Reed van Richards';
console.log('updated p1.name:', p1.name);
console.log('constructor preserved:', p1.constructor === Person);
console.log('name is enumerable:', Object.prototype.propertyIsEnumerable.call(Person.prototype, 'name'));
