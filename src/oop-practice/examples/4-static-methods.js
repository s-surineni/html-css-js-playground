class TemperatureConverter {
  static FACTOR = 9 / 5;

  static celsiusToFahrenheit(celsius) {
    return celsius * TemperatureConverter.FACTOR + 32;
  }
  static fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) / TemperatureConverter.FACTOR;
  }
}
