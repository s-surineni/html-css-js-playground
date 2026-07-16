expect(Object.getPrototypeOf(superHero), person, 'child delegates to person');
expect(person.isPrototypeOf(superHero), true, 'person is in the prototype chain');
expect(Object.hasOwn(superHero, 'getName'), false, 'method is inherited');
expect(superHero.getName === person.getName, true, 'inherited method is shared');
expect(superHero.firstName, 'Tony', 'delete reveals the inherited value');
