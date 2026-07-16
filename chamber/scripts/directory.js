const directory = document.querySelector('#directory');
const gridView = document.querySelector('#gridView');
const listView = document.querySelector('#listView');
const lastModifiedDate = document.querySelector('#lastModifiedDate');
const copyrightYear = document.querySelector('#copyrightYear');

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

function getMembershipLabel(level) {
    switch (level) {
        case 3:
            return 'Gold Member';
        case 2:
            return 'Silver Member';
        case 1:
        default:
            return 'Member';
    }
}

function displayMembers(members) {
    directory.innerHTML = '';

    members.forEach((member) => {
        const card = document.createElement('li');
        card.className = 'directory-card';

        card.innerHTML = `
      <div class="company-logo">
        <img class="company-splash" src="images/${member.image}" alt="${member.name} logo" />
      </div>
      <div class="company-meta">
        <h3>${member.name}</h3>
        <p class="membership-pill">${getMembershipLabel(member.membershipLevel)}</p>
        <p>${member.industry} &bull; ${member.address}</p>
        <p>${member.description}</p>
      </div>
      <div class="company-data">
        <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
        <p><strong>Web:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
      </div>
    `;

        directory.appendChild(card);
    });
}

async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`Failed to load members: ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data.companies);
    } catch (error) {
        directory.innerHTML = `<li class="directory-card"><p>Unable to load member data. ${error.message}</p></li>`;
        console.error(error);
    }
}

function setPageInfo() {
    const modified = document.lastModified || new Date().toISOString();
    lastModifiedDate.textContent = formatDate(modified);
    copyrightYear.textContent = new Date().getFullYear();
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

getMembers();
setPageInfo();
