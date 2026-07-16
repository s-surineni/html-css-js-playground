const animal = {
  makeSound() {
    return 'Unknown sound';
  },
  describe() {
    return `${this.name}: ${this.makeSound()}`;
  },
};

const dog = Object.create(animal);
dog.name = 'Dog';
dog.makeSound = function () {
  return 'Woof!';
};

const cat = Object.create(animal);
cat.name = 'Cat';
cat.makeSound = function () {
  return 'Meow!';
};

console.log('--- Prototype Polymorphism ---');
const animals = [dog, cat];
for (const currentAnimal of animals) {
  console.log(currentAnimal.describe());
}
