// This file handles the functionality for the home page, including fetching weather data and displaying company spotlights.

document.addEventListener("DOMContentLoaded", () => {
    fetchWeatherData();
    displayCompanySpotlights();
});

function fetchWeatherData() {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const city = 'Ruwa'; // Change to the desired city
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const weatherSection = document.getElementById('weather');
            weatherSection.innerHTML = `
                <h2>Current Weather in ${data.name}</h2>
                <p>${data.weather[0].description}</p>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Humidity: ${data.main.humidity}%</p>
            `;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function displayCompanySpotlights() {
    const spotlights = [
        {
            name: "Company A",
            description: "Leading provider of local services.",
            logo: "images/company-a-logo.png"
        },
        {
            name: "Company B",
            description: "Innovative solutions for your business.",
            logo: "images/company-b-logo.png"
        },
        {
            name: "Company C",
            description: "Your trusted partner in growth.",
            logo: "images/company-c-logo.png"
        }
    ];

    const spotlightSection = document.getElementById('company-spotlights');
    spotlights.forEach(company => {
        const spotlightDiv = document.createElement('div');
        spotlightDiv.classList.add('spotlight');
        spotlightDiv.innerHTML = `
            <img src="${company.logo}" alt="${company.name} logo" />
            <h3>${company.name}</h3>
            <p>${company.description}</p>
        `;
        spotlightSection.appendChild(spotlightDiv);
    });
}