// Update weather information in the DOM
const updateWeatherInfo = (temperature, weatherIcon) => {
    const roundedTemperature = Math.round(temperature);
    const tempElement = document.querySelector('.temp');
    tempElement.innerHTML = `${roundedTemperature}°C <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">`;
};