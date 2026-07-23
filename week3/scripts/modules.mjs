const eventList = document.querySelector('#eventList');
const weatherCurrent = document.querySelector('#weatherCurrent');
const forecastList = document.querySelector('#forecastList');
const spotlightCards = document.querySelector('#spotlightCards');
const lastModifiedDate = document.querySelector('#lastModifiedDate');
const copyrightYear = document.querySelector('#copyrightYear');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

const chamberEvents = [
    {
        title: 'Quarterly Business Networking Breakfast',
        date: 'Friday, 30 July 2026',
        details: 'Meet local entrepreneurs and investors at Ruwa Civic Hall from 7:30 AM to 9:30 AM.'
    },
    {
        title: 'SME Digital Marketing Workshop',
        date: 'Wednesday, 5 August 2026',
        details: 'Hands-on training for small businesses to improve online visibility and customer engagement.'
    },
    {
        title: 'Community Trade Fair',
        date: 'Saturday, 15 August 2026',
        details: 'Showcase products and services from Ruwa businesses at the Windsor Mall outdoor pavilion.'
    }
];

const weatherConfig = {
    city: 'Ruwa',
    countryCode: 'ZW',
    units: 'metric',
    apiKey: window.CHAMBER_CONFIG?.openWeatherApiKey || ''
};

function hasValidApiKey(apiKey) {
    return Boolean(apiKey && !apiKey.includes('YOUR_OPENWEATHERMAP_API_KEY') && !apiKey.includes('YOUR_KEY'));
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function setPageInfo() {
    const modified = document.lastModified || new Date().toISOString();
    if (lastModifiedDate) {
        lastModifiedDate.textContent = formatDate(modified);
    }
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
}

function setupNavigation() {
    if (!navToggle || !siteNav) {
        return;
    }

    navToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    siteNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 900) {
                siteNav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

function renderEvents() {
    if (!eventList) {
        return;
    }

    eventList.innerHTML = chamberEvents
        .map(
            (event) => `
                <li class="event-item">
                    <h3>${event.title}</h3>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p>${event.details}</p>
                </li>
            `
        )
        .join('');
}

function labelMembership(level) {
    if (level === 3) {
        return 'Gold Member';
    }
    if (level === 2) {
        return 'Silver Member';
    }
    return 'Member';
}

function createSpotlightCard(member) {
    const card = document.createElement('article');
    card.className = 'spotlight-card';

    const image = document.createElement('img');
    image.src = `../chamber/images/${member.image}`;
    image.alt = `${member.name} logo`;
    image.loading = 'lazy';

    const name = document.createElement('h3');
    name.textContent = member.name;

    const membership = document.createElement('p');
    membership.className = 'membership';
    membership.textContent = labelMembership(member.membershipLevel);

    const phone = document.createElement('p');
    const phoneStrong = document.createElement('strong');
    phoneStrong.textContent = 'Phone:';
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${member.phone}`;
    phoneLink.textContent = member.phone;
    phone.append(phoneStrong, ' ', phoneLink);

    const address = document.createElement('p');
    const addressStrong = document.createElement('strong');
    addressStrong.textContent = 'Address:';
    address.append(addressStrong, ` ${member.address}`);

    const website = document.createElement('p');
    const websiteStrong = document.createElement('strong');
    websiteStrong.textContent = 'Website:';
    const websiteLink = document.createElement('a');
    websiteLink.href = member.website;
    websiteLink.target = '_blank';
    websiteLink.rel = 'noopener';
    websiteLink.textContent = member.website;
    website.append(websiteStrong, ' ', websiteLink);

    card.append(image, name, membership, phone, address, website);
    return card;
}

function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i -= 1) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
    }
    return copy;
}

async function loadSpotlights() {
    if (!spotlightCards) {
        return;
    }

    try {
        const response = await fetch('../chamber/data/members.json');
        if (!response.ok) {
            throw new Error(`Failed to load members (${response.status})`);
        }

        const data = await response.json();
        const qualified = data.companies.filter((member) => member.membershipLevel === 2 || member.membershipLevel === 3);

        if (qualified.length === 0) {
            spotlightCards.innerHTML = '<p>No qualified spotlight members available at this time.</p>';
            return;
        }

        const count = qualified.length > 2 ? Math.floor(Math.random() * 2) + 2 : qualified.length;
        const selected = shuffle(qualified).slice(0, count);

        spotlightCards.innerHTML = '';
        selected.forEach((member) => {
            spotlightCards.appendChild(createSpotlightCard(member));
        });
    } catch (error) {
        spotlightCards.innerHTML = `<p>Unable to load member spotlights. ${error.message}</p>`;
        console.error(error);
    }
}

function selectNoonForecast(list) {
    const today = new Date().toISOString().split('T')[0];
    const grouped = new Map();

    list.forEach((item) => {
        const datePart = item.dt_txt.split(' ')[0];
        if (datePart === today || grouped.has(datePart)) {
            return;
        }

        if (item.dt_txt.includes('12:00:00')) {
            grouped.set(datePart, item);
        }
    });

    if (grouped.size < 3) {
        list.forEach((item) => {
            const datePart = item.dt_txt.split(' ')[0];
            if (datePart === today || grouped.has(datePart)) {
                return;
            }
            grouped.set(datePart, item);
        });
    }

    return Array.from(grouped.values()).slice(0, 3);
}

async function loadWeather() {
    if (!weatherCurrent || !forecastList) {
        return;
    }

    if (!hasValidApiKey(weatherConfig.apiKey)) {
        weatherCurrent.innerHTML =
            '<p>Add your OpenWeatherMap key in week3/scripts/config.js as window.CHAMBER_CONFIG = { openWeatherApiKey: "YOUR_KEY" }.</p>';
        forecastList.innerHTML = '';
        return;
    }

    const query = `${weatherConfig.city},${weatherConfig.countryCode}`;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${weatherConfig.units}&appid=${weatherConfig.apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=${weatherConfig.units}&appid=${weatherConfig.apiKey}`;

    try {
        const [weatherResponse, forecastResponse] = await Promise.all([fetch(weatherUrl), fetch(forecastUrl)]);

        if (!weatherResponse.ok || !forecastResponse.ok) {
            throw new Error('Weather service unavailable. Check API key and location settings.');
        }

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        weatherCurrent.innerHTML = `
            <p class="temp">${Math.round(weatherData.main.temp)}&deg;C</p>
            <p class="desc">${weatherData.weather[0].description}</p>
        `;

        const nextThree = selectNoonForecast(forecastData.list);
        forecastList.innerHTML = nextThree
            .map((entry) => {
                const date = new Date(entry.dt_txt);
                const dayLabel = date.toLocaleDateString('en-GB', { weekday: 'long' });
                return `
                    <li class="forecast-item">
                        <h3>${dayLabel}</h3>
                        <p>${Math.round(entry.main.temp)}&deg;C</p>
                    </li>
                `;
            })
            .join('');
    } catch (error) {
        weatherCurrent.innerHTML = '<p>Unable to retrieve weather data at this time.</p>';
        forecastList.innerHTML = '';
        console.error(error);
    }
}

setupNavigation();
renderEvents();
loadWeather();
loadSpotlights();
setPageInfo();
