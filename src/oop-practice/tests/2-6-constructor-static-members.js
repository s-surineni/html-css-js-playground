expect(LegacyTemperatureConverter.FACTOR, 1.8, 'constructor holds a static-like field');
expect(
  LegacyTemperatureConverter.celsiusToFahrenheit(25),
  77,
  'constructor holds a static-like method',
);
expect(LegacyTemperatureConverter.instanceCount, 2, 'constructor tracks shared state');
expect(legacyConverter1.FACTOR, undefined, 'constructor field is absent from instances');
expect(
  legacyConverter1.celsiusToFahrenheit,
  undefined,
  'constructor method is absent from instances',
);
expect(legacyConverter1.id, 1, 'closure generates the first private ID');
expect(legacyConverter2.id, 2, 'constructor instances share the closure counter');
expect(LegacyTemperatureConverter.getNextId(), 3, 'constructor method can read private state');
expect(LegacyTemperatureConverter.nextId, undefined, 'private closure state is not exposed');
expect(legacyConverter1.unit, 'Celsius', 'factory initializes the returned instance');
