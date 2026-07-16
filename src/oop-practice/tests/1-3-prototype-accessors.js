expect(superHero.name, 'Miles Gonzalo Morales', 'inherited setter updates the receiver');
expect(person.name, 'Tony Stark', 'child update leaves the prototype unchanged');
expect(Object.hasOwn(superHero, 'name'), false, 'accessor remains inherited');
superHero.name = 'SingleName';
expect(superHero.name, 'Miles Gonzalo Morales', 'invalid name is rejected');
