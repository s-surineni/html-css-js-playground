expect(objectPerson.greet(), 'Hello, Tony', 'plain object models one person directly');
expect(constructorTony.greet(), 'Hello, Tony', 'constructor creates the same behavior');
expect(constructorBruce.greet(), 'Hello, Bruce', 'constructor creates multiple instances');
expect(
  constructorTony.greet === constructorBruce.greet,
  true,
  'constructor shares methods through its prototype',
);
expect(constructorTony instanceof ConstructorPerson, true, 'constructor supports instanceof');
expect(ConstructorPerson.instanceCount, 2, 'constructor can hold static-like shared state');
expect(classTony.greet(), 'Hello, Tony', 'class provides equivalent behavior');
expect(classBruce.greet(), 'Hello, Bruce', 'class creates multiple instances');
expect(classTony.greet === classBruce.greet, true, 'class methods are shared automatically');
expect(classTony instanceof ClassPerson, true, 'class supports instanceof');
expect(ClassPerson.instanceCount, 2, 'class provides dedicated static syntax');
expect(classTony.name, 'Tony', 'class getter exposes selected private state');
expect(Object.hasOwn(classTony, '#name'), false, 'private field is not a public property');
