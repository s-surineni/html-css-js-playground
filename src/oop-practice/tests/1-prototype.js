expect(Object.getPrototypeOf(superHero), person, 'superHero delegates to person');
expect(person.isPrototypeOf(superHero), true, 'person is in the prototype chain');
expect(Object.hasOwn(superHero, 'getName'), false, 'getName is inherited');
expect(superHero.getName === person.getName, true, 'method is shared');
expect(superHero.firstName, 'Tony', 'delete reveals inherited firstName');
