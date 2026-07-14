// ============================================================
// Polymorphism using Object Prototypes
// ============================================================
// Different objects can share the same interface (method names)
// but implement different behaviors. No classes needed!

// Base prototype with a default implementation
const Animal = {
  makeSound() {
    return "Some generic animal sound";
  },
  describe() {
    return `This animal says: ${this.makeSound()}`;
  }
};

// Create specific animal objects that inherit from Animal
// but override makeSound with their own implementation
const dog = Object.create(Animal);
dog.name = "Dog";
dog.makeSound = function() {
  return "Woof! Woof!";
};

const cat = Object.create(Animal);
cat.name = "Cat";
cat.makeSound = function() {
  return "Meow!";
};

const cow = Object.create(Animal);
cow.name = "Cow";
cow.makeSound = function() {
  return "Moo!";
};

// Display results
console.log("🐾 Polymorphism Example 1: Animal Sounds");
console.log("");

// Polymorphism in action: same method call, different behavior
console.log(dog.describe());
console.log(cat.describe());
console.log(cow.describe());

console.log("");
console.log("Processing animals uniformly:");
// You can treat them uniformly through their shared interface
const animals = [dog, cat, cow];
animals.forEach(animal => {
  console.log(`${animal.name}: ${animal.makeSound()}`);
});

// The key insight: describe() is defined once on Animal prototype,
// but it calls makeSound(), which each object overrides.
// This is polymorphism — "many forms" of the same operation.

// ============================================================
// Another example: Shape area calculation
// ============================================================

console.log("");
console.log("📐 Polymorphism Example 2: Shape Areas");
console.log("");

const Shape = {
  getArea() {
    throw new Error("getArea() must be implemented by derived objects");
  },
  describe() {
    return `This shape has an area of ${this.getArea().toFixed(2)} square units`;
  }
};

// Different shapes with different area calculations
const circle = Object.create(Shape);
circle.name = "Circle";
circle.radius = 5;
circle.getArea = function() {
  return Math.PI * this.radius ** 2;
};

const rectangle = Object.create(Shape);
rectangle.name = "Rectangle";
rectangle.width = 4;
rectangle.height = 6;
rectangle.getArea = function() {
  return this.width * this.height;
};

const triangle = Object.create(Shape);
triangle.name = "Triangle";
triangle.base = 8;
triangle.height = 3;
triangle.getArea = function() {
  return 0.5 * this.base * this.height;
};

// Same method name, different implementations
console.log(`${circle.name}: ${circle.describe()}`);
console.log(`${rectangle.name}: ${rectangle.describe()}`);
console.log(`${triangle.name}: ${triangle.describe()}`);

// Process them uniformly
const shapes = [circle, rectangle, triangle];
const totalArea = shapes.reduce((sum, shape) => sum + shape.getArea(), 0);
console.log("");
console.log(`📊 Total area of all shapes: ${totalArea.toFixed(2)} square units`);
