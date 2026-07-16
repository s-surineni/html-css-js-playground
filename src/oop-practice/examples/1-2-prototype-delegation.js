const person = {
  firstName: 'Tony',
  lastName: 'Stark',
  getName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

// Choose the prototype when creating the child object.
const superHero = Object.create(person);
superHero.firstName = 'Iron';
superHero.lastName = 'Man';

console.log('--- Prototype Delegation ---');
console.log('name:', superHero.getName());
console.log('prototype link:', Object.getPrototypeOf(superHero) === person);
console.log('own firstName:', Object.hasOwn(superHero, 'firstName'));
console.log('own getName:', Object.hasOwn(superHero, 'getName'));
console.log('getName found in chain:', 'getName' in superHero);

// Deleting an own property reveals the inherited value.
delete superHero.firstName;
console.log('after delete:', superHero.firstName);
