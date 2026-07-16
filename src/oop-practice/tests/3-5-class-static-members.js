expect(TemperatureConverter.celsiusToFahrenheit(25), 77, 'static utility runs on class');
expect(TemperatureConverter.instanceCount, 2, 'static field tracks shared state');
expect(kitchenConverter.celsiusToFahrenheit, undefined, 'static method is absent from instances');
expect(labConverter.label, 'Laboratory', 'static factory initializes an instance');
expect(CustomConverter.celsiusToFahrenheit(10), 52, 'subclass customizes inherited static behavior');
expect(TemperatureConverter.FACTOR, 1.8, 'subclass field leaves base field unchanged');
