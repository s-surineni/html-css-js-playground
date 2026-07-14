expect(p1 instanceof Person, true, 'new links the instance to Person.prototype');
expect(Object.getPrototypeOf(p1), Person.prototype, 'prototype link is inspectable');
expect(p1.getName === p2.getName, true, 'prototype method is shared');
expect(p1.greet === p2.greet, false, 'instance method is allocated per object');
expect(manualPerson instanceof Person, true, 'manual steps reproduce the prototype link');
expect(manualPerson.getName(), 'Natasha Romanoff', 'manual construction initializes state');
expect(arrowMethodExample.readValue(), 'captured value', 'arrow method keeps its lexical this');
