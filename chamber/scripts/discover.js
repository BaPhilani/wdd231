import discoverItems from '../data/discover-items.mjs';

const discoverGrid = document.querySelector('#discoverGrid');
const visitMessage = document.querySelector('#visitMessage');

function createCard(item) {
    const article = document.createElement('article');
    article.className = 'discover-card';

    const heading = document.createElement('h2');
    heading.textContent = item.title;

    const figure = document.createElement('figure');
    const image = document.createElement('img');
    image.src = `images/${item.image}`;
    image.alt = item.title;
    image.loading = 'lazy';
    figure.appendChild(image);

    const address = document.createElement('address');
    address.textContent = item.address;

    const description = document.createElement('p');
    description.textContent = item.description;

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Learn more';

    article.append(heading, figure, address, description, button);
    return article;
}

function renderCards() {
    if (!discoverGrid) {
        return;
    }

    discoverGrid.innerHTML = '';
    discoverItems.forEach((item) => {
        discoverGrid.appendChild(createCard(item));
    });
}

function getVisitMessage() {
    const now = Date.now();
    const stored = localStorage.getItem('ruwa-chamber-last-visit');

    if (!stored) {
        localStorage.setItem('ruwa-chamber-last-visit', now.toString());
        return 'Welcome! Let us know if you have any questions.';
    }

    const lastVisit = Number(stored);
    const diffMs = now - lastVisit;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    localStorage.setItem('ruwa-chamber-last-visit', now.toString());

    if (diffMs < 24 * 60 * 60 * 1000) {
        return 'Back so soon! Awesome!';
    }

    return diffDays === 1
        ? 'You last visited 1 day ago.'
        : `You last visited ${diffDays} days ago.`;
}

function renderVisitMessage() {
    if (!visitMessage) {
        return;
    }

    visitMessage.textContent = getVisitMessage();
}

renderCards();
renderVisitMessage();
