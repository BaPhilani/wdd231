// This file contains functions to fetch and display weather data from the OpenWeatherMap API.
// It retrieves the current temperature, weather description, and a three-day forecast for the chamber's location.

const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const city = 'YOUR_CITY'; // Replace with the desired city
const weatherContainer = document.getElementById('weather');

async function fetchWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        weatherContainer.innerHTML = '<p>Unable to retrieve weather data.</p>';
    }
}

function displayWeather(data) {
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;
    weatherContainer.innerHTML = `
        <h2>Current Weather</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${weatherDescription}</p>
    `;
}

// Call the fetchWeather function to load the weather data when the page loads
document.addEventListener('DOMContentLoaded', fetchWeather);