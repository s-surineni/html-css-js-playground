// Prototype-based OOP on plain objects.
const person = {
  firstName: 'Tony',
  lastName: 'Stark',
  getName() {
    return `${this.firstName} ${this.lastName}`;
  },
};
console.log('person.getName():', person.getName());

// Create child object with person as prototype
const superHero = {};
Object.setPrototypeOf(superHero, person);

// Override properties from prototype
superHero.firstName = 'Iron';
superHero.lastName = 'Man';
console.log('superHero.getName():', superHero.getName());

// Demonstrate prototype chain
console.log('\n--- Prototype Chain ---');
console.log('Object.getPrototypeOf(superHero) === person:', Object.getPrototypeOf(superHero) === person);
console.log('person.getName === superHero.getName:', person.getName === superHero.getName);

// Show property lookup: own vs inherited
console.log('\n--- Property Lookup ---');
console.log('superHero.hasOwnProperty("firstName"):', superHero.hasOwnProperty('firstName'));
console.log('superHero.hasOwnProperty("getName"):', superHero.hasOwnProperty('getName'));
console.log('"getName" in superHero:', 'getName' in superHero);

