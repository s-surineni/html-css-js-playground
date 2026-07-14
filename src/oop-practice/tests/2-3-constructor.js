expect(hero.describe(), 'Tony Stark uses Suit', 'child method uses inherited getName');
expect(hero instanceof SuperHero, true, 'hero is a SuperHero');
expect(hero instanceof Person, true, 'hero is also a Person');
expect(hero.constructor, SuperHero, 'child constructor link is restored');
expect(Object.getPrototypeOf(SuperHero.prototype), Person.prototype, 'prototype chains are linked');
