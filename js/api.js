// OpenWeatherMap API key 
const apiKey = '41ccd155c8cc679e660102df8b4b5bed';
// Proxy server URL
const proxyUrl = 'https://proxy.junocollege.com/';

// Making Flag Icon API Call
const fetchCountryFlagIcons = (countryCode, imgElement) => {
    const flagIconsUrl = `${proxyUrl}https://flagsapi.com/${countryCode}/shiny/16.png`;

    console.log('Fetching flag for country:', countryCode);
        fetch(flagIconsUrl)
        .then(response => {
            console.log('Response status:', response.status);
            return response.blob();
        })
        .then(blobData => {
            const blob = new Blob([blobData], { type: 'image/png' });
            imgElement.src = URL.createObjectURL(blob);
        })
        .catch(error => {
            console.error('Error fetching country flag icon:', error);
        })
};

// Making Open Weather API Call 
const fetchWeatherData = (location) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    
    fetch(weatherUrl)
    .then(response => response.json())
    .then(weatherData => {
        console.log(weatherData);
        
        const temperature = weatherData.main.temp;
        const weatherIcon = weatherData.weather[0].icon;
        updateWeatherInfo(temperature, weatherIcon);
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });
};
