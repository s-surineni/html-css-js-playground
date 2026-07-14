expect(Object.getPrototypeOf(superHero), person, 'superHero delegates to person');
expect(Object.hasOwn(superHero, 'describe'), false, 'delete removes own override');
expect(superHero.describe(), 'Person: Iron Man', 'inherited method is revealed');
superHero.describe = function() { return `Hero: ${this.getName()}`; };
expect(superHero.describe(), 'Hero: Iron Man', 'own method overrides inherited method');
