expect(hero.introduce(), 'I am Tony Stark', 'method uses its calling object as this');
expect(introduce.call({ name: 'Bruce Banner' }), 'I am Bruce Banner', 'call supplies this');
expect(introduce.apply({ name: 'Natasha Romanoff' }), 'I am Natasha Romanoff', 'apply supplies this');
expect(boundIntroduce(), 'I am Tony Stark', 'bind creates a function with fixed this');
expect(arrowExample.readName(), 'Outer receiver', 'arrow captures surrounding this');
