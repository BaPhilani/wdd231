document.addEventListener('DOMContentLoaded', () => {
  const currentTemp = document.querySelector('#current-temp');
  const weatherIcon = document.querySelector('#weather-icon');
  const captionDesc = document.querySelector('figcaption');

  const url =
    'https://api.openweathermap.org/data/2.5/weather?lat=49.749992&lon=6.637143&units=imperial&appid=2241189c9f366c7da22da69788014e25';

  function displayResults(data) {
    currentTemp.textContent = `${Math.round(data.main.temp)}°F`;

    const iconCode = data.weather[0].icon;
    const desc = data.weather[0].description;

    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = desc;
    captionDesc.textContent = desc;
  }

  async function apiFetch() {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      displayResults(data);
    } catch (error) {
      console.error(error);
      currentTemp.textContent = 'Unavailable';
      captionDesc.textContent = 'Weather data could not be loaded.';
    }
  }

  apiFetch();
});