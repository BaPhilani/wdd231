const directory = document.querySelector('#directory');
const gridView = document.querySelector('#gridView');
const listView = document.querySelector('#listView');
const lastModifiedDate = document.querySelector('#lastModifiedDate');

const members = [
    {
        name: 'Ruwa Supply Co.',
        tagline: 'Local hardware and construction supplies',
        email: 'contact@ruwasupply.co.zw',
        phone: '(+263) 77 345 6789',
        website: 'https://ruwasupply.co.zw',
        initials: 'RS'
    },
    {
        name: 'Eastern Digital Media',
        tagline: 'Design, branding, and digital marketing',
        email: 'hello@easterndigital.co.zw',
        phone: '(+263) 78 987 6543',
        website: 'https://easterndigital.co.zw',
        initials: 'ED'
    },
    {
        name: 'Mbada Catering Services',
        tagline: 'Catering for events, meetings, and celebrations',
        email: 'orders@mbadacatering.co.zw',
        phone: '(+263) 71 234 5678',
        website: 'https://mbadacatering.co.zw',
        initials: 'MB'
    },
    {
        name: 'Ruwa Wellness Center',
        tagline: 'Health and wellness services for the community',
        email: 'info@ruwawellness.co.zw',
        phone: '(+263) 78 123 4567',
        website: 'https://ruwawellness.co.zw',
        initials: 'RW'
    },
    {
        name: 'Nyika Printing House',
        tagline: 'Print, copy, and signage solutions',
        email: 'print@nyikaprint.co.zw',
        phone: '(+263) 77 555 1234',
        website: 'https://nyikaprint.co.zw',
        initials: 'NP'
    },
    {
        name: 'Chiedza Learning Hub',
        tagline: 'Tutoring and business coaching in Ruwa',
        email: 'support@chiedzahub.co.zw',
        phone: '(+263) 71 876 5432',
        website: 'https://chiedzahub.co.zw',
        initials: 'CH'
    }
];

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

function renderDirectory() {
    directory.innerHTML = '';

    members.forEach((member) => {
        const card = document.createElement('li');
        card.className = 'directory-card';

        card.innerHTML = `
      <div class="company-logo"><span>${member.initials}</span></div>
      <div class="company-meta">
        <h3>${member.name}</h3>
        <p>${member.tagline}</p>
      </div>
      <div class="company-data">
        <p><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
        <p><strong>URL:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
      </div>
    `;

        directory.appendChild(card);
    });
}

function setLastModified() {
    const modified = document.lastModified || new Date().toISOString();
    lastModifiedDate.textContent = formatDate(modified);
}

function activateGrid() {
    directory.className = 'directory-grid';
    gridView.classList.add('active');
    listView.classList.remove('active');
}

function activateList() {
    directory.className = 'directory-list';
    listView.classList.add('active');
    gridView.classList.remove('active');
}

gridView.addEventListener('click', activateGrid);
listView.addEventListener('click', activateList);

renderDirectory();
setLastModified();
