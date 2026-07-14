expect(TemperatureConverter.celsiusToFahrenheit(25), 77, '25°C → 77°F');
expect(TemperatureConverter.celsiusToFahrenheit(0), 32, '0°C → 32°F');
expect(TemperatureConverter.fahrenheitToCelsius(77), 25, '77°F → 25°C');
expect(TemperatureConverter.FACTOR, 1.8, 'static FACTOR is 9/5');
class CustomConverter extends TemperatureConverter {}
CustomConverter.FACTOR = 2;
expect(CustomConverter.celsiusToFahrenheit(10), 52, 'static method supports subclass customization');
expect(new TemperatureConverter().celsiusToFahrenheit, undefined, 'static method is not on instances');
