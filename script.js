document.getElementById('fetch-weather').addEventListener('click', function() {
    const location = document.getElementById('location-input').value;
    getWeatherByLocationName(location);
});

document.getElementById('get-location-weather').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByCoordinates(lat, lon);
        }, error => {
            alert('Error getting location. Please enter a location manually.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function getWeatherByLocationName(location) {
    const apiKey = '294699ab61d7ee849121cc70d6fcf17b'; // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-display').textContent = 'Error fetching weather data. Please try again later.';
        });
}

function getWeatherByCoordinates(lat, lon) {
    const apiKey = '294699ab61d7ee849121cc70d6fcf17b'; // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-display').textContent = 'Error fetching weather data. Please try again later.';
        });
}

function displayWeather(data) {
    if (data.cod === 200) {
        document.getElementById('location').textContent = `Location: ${data.name}, ${data.sys.country}`;
        document.getElementById('description').textContent = `Description: ${data.weather[0].description}`;
        document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
    } else {
        document.getElementById('weather-display').textContent = 'Location not found. Please try again.';
    }
}
