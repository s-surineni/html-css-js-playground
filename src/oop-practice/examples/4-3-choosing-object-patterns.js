console.log('--- 1. Plain Object: One Person ---');
const objectPerson = {
  name: 'Tony',
  greet() {
    return `Hello, ${this.name}`;
  },
};
console.log(objectPerson.greet());

console.log('\n--- 2. Constructor: Repeatable Person Instances ---');
function ConstructorPerson(name) {
  this.name = name;
}

ConstructorPerson.instanceCount = 0;
ConstructorPerson.create = function (name) {
  ConstructorPerson.instanceCount++;
  return new ConstructorPerson(name);
};
ConstructorPerson.prototype.greet = function () {
  return `Hello, ${this.name}`;
};

const constructorTony = ConstructorPerson.create('Tony');
const constructorBruce = ConstructorPerson.create('Bruce');
console.log(constructorTony.greet());
console.log('method shared:', constructorTony.greet === constructorBruce.greet);
console.log('instanceof:', constructorTony instanceof ConstructorPerson);
console.log('instances:', ConstructorPerson.instanceCount);

console.log('\n--- 3. Class: Equivalent Model with Dedicated Syntax ---');
class ClassPerson {
  static instanceCount = 0;
  #name;

  constructor(name) {
    this.#name = name;
    ClassPerson.instanceCount++;
  }

  get name() {
    return this.#name;
  }

  greet() {
    return `Hello, ${this.#name}`;
  }
}

const classTony = new ClassPerson('Tony');
const classBruce = new ClassPerson('Bruce');
console.log(classTony.greet());
console.log('method shared:', classTony.greet === classBruce.greet);
console.log('instanceof:', classTony instanceof ClassPerson);
console.log('instances:', ClassPerson.instanceCount);
console.log('private name property:', classTony.name);

console.log('\n--- Choosing ---');
console.log('Plain object: one simple value or namespace.');
console.log('Constructor: repeatable instances using explicit prototype setup.');
console.log('Class: the same prototype model with dedicated syntax and #private fields.');
