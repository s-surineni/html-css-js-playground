// Prototype delegation on plain objects.
const person = {
  firstName: 'Tony',
  lastName: 'Stark',
  getName() {
    return `${this.firstName} ${this.lastName}`;
  },
};
console.log('person.getName():', person.getName());

// Prefer choosing the prototype when the object is created. Changing an
// existing object's prototype with Object.setPrototypeOf() can be slow.
const superHero = Object.create(person);

// These own properties shadow values found on person.
superHero.firstName = 'Iron';
superHero.lastName = 'Man';
console.log('superHero.getName():', superHero.getName());

// Demonstrate prototype chain
console.log('\n--- Prototype Chain ---');
console.log('Object.getPrototypeOf(superHero) === person:', Object.getPrototypeOf(superHero) === person);
console.log('person.getName === superHero.getName:', person.getName === superHero.getName);

// Show property lookup: own vs inherited
console.log('\n--- Property Lookup ---');
console.log('Object.hasOwn(superHero, "firstName"):', Object.hasOwn(superHero, 'firstName'));
console.log('Object.hasOwn(superHero, "getName"):', Object.hasOwn(superHero, 'getName'));
console.log('"getName" in superHero:', 'getName' in superHero);

// Deleting an own property reveals the inherited value again.
delete superHero.firstName;
console.log('after delete, superHero.firstName:', superHero.firstName);
console.log('person.isPrototypeOf(superHero):', person.isPrototypeOf(superHero));
