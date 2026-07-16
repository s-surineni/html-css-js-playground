expect(dog.describe(), 'Dog: Woof!', 'dog supplies its own implementation');
expect(cat.describe(), 'Cat: Meow!', 'cat supplies its own implementation');
expect(dog.describe === cat.describe, true, 'describe is shared through the prototype');
expect(animals.map((item) => item.makeSound()).join(', '), 'Woof!, Meow!', 'same call supports many forms');
