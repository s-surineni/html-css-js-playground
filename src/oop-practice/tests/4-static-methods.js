expect(TemperatureConverter.celsiusToFahrenheit(25), 77, '25°C → 77°F');
expect(TemperatureConverter.celsiusToFahrenheit(0), 32, '0°C → 32°F');
expect(TemperatureConverter.fahrenheitToCelsius(77), 25, '77°F → 25°C');
expect(TemperatureConverter.FACTOR, 1.8, 'static FACTOR is 9/5');
expect(TemperatureConverter.instanceCount, 2, 'static counter tracks all instances');
expect(converter1.unit, 'Celsius', 'instance field is available on each instance');
expect(converter1.FACTOR, undefined, 'static field is not available on instances');
expect(
  converter1.celsiusToFahrenheit,
  undefined,
  'static method is not available on instances',
);
expect(TemperatureConverter.isValidTemperature(25), true, 'static validator accepts numbers');
expect(TemperatureConverter.isValidTemperature(NaN), false, 'static validator rejects NaN');
expect(converter1.label, 'Kitchen', 'static factory creates and initializes an instance');
expect(CustomConverter.celsiusToFahrenheit(10), 52, 'static method supports subclass customization');
expect(TemperatureConverter.FACTOR, 1.8, 'subclass field does not change the base field');
