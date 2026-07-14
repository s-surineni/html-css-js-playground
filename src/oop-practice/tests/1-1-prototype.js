expect(person.name, 'Bruce Banner', 'setter updates the prototype object');
expect(superHero.name, 'Reed Richards', 'inherited setter updates the receiver');
expect(Object.hasOwn(superHero, 'name'), false, 'accessor remains inherited');
superHero.name = 'Miles Gonzalo Morales';
expect(superHero.name, 'Miles Gonzalo Morales', 'multi-word last name is preserved');
superHero.name = 'SingleName';
expect(superHero.name, 'Miles Gonzalo Morales', 'invalid name is rejected');
