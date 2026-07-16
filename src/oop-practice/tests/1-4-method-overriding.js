expect(Object.hasOwn(superHero, 'describe'), false, 'delete removes the override');
expect(superHero.describe(), 'Person: Iron Man', 'deleting override reveals inherited method');
superHero.describe = function () { return `Hero: ${this.getName()}`; };
expect(superHero.describe(), 'Hero: Iron Man', 'own method overrides inherited method');
