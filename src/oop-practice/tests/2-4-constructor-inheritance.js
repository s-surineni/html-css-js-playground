expect(hero.describe(), 'Tony Stark uses Suit', 'child combines inherited and own behavior');
expect(hero instanceof SuperHero, true, 'instance uses child prototype');
expect(hero instanceof Person, true, 'parent prototype is also in the chain');
expect(hero.constructor, SuperHero, 'child constructor link is restored');
expect(Object.getPrototypeOf(SuperHero.prototype), Person.prototype, 'prototype chains are linked');
