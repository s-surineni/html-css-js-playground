expect(TemperatureConverter.FACTOR, 1.8, 'constructor holds a static-like field');
expect(TemperatureConverter.celsiusToFahrenheit(25), 77, 'constructor holds a static-like method');
expect(TemperatureConverter.instanceCount, 2, 'constructor tracks shared state');
expect(kitchenConverter.celsiusToFahrenheit, undefined, 'static method is absent from instances');
expect(labConverter.unit, 'Fahrenheit', 'factory initializes the returned instance');
