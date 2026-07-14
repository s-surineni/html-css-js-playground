// Prototype-based OOP with Getters and Setters
const person = {
  firstName: 'Tony',
  lastName: 'Stark',

  // Regular method
  getName() {
    return `${this.firstName} ${this.lastName}`;
  },

  // Getter - access like a property, no ()
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },

  // Setter - validates and preserves multi-word last names
  set name(value) {
    if (typeof value !== 'string') {
      console.log('❌ Invalid name format. Expected: "FirstName LastName"');
      return;
    }
    const [firstName, ...lastNameParts] = value.trim().split(/\s+/);
    if (!firstName || lastNameParts.length === 0) {
      console.log('❌ Invalid name format. Expected: "FirstName LastName"');
      return;
    }
    this.firstName = firstName;
    this.lastName = lastNameParts.join(' ');
  }
};

console.log('--- Using Regular Method vs Getter ---');
console.log('person.getName():', person.getName());
console.log('person.name (getter):', person.name);

console.log('\n--- Using Setter ---');
console.log('Setting person.name = "Bruce Banner"');
person.name = "Bruce Banner";
console.log('After setter, person.name:', person.name);

console.log('\n--- Setter Validation ---');
console.log('Trying person.name = "SingleName"');
person.name = "SingleName"; // Should fail validation
console.log('person.name (unchanged):', person.name);

console.log('\n--- Prototype Inheritance ---');
const superHero = Object.create(person);
superHero.firstName = 'Iron';
superHero.lastName = 'Man';
console.log('superHero.name (inherited getter):', superHero.name);

console.log('\n--- Setter Works on Child ---');
console.log('Setting superHero.name = "Reed Richards"');
superHero.name = "Reed Richards";
console.log('After setter, superHero.name:', superHero.name);
console.log('Original person.name (unchanged):', person.name);
