// This file manages the functionality for the directory page.

// Function to fetch directory data and populate the directory section
async function fetchDirectoryData() {
    try {
        const response = await fetch('path/to/directory-data.json'); // Update with the actual path to your data
        const data = await response.json();
        populateDirectory(data);
    } catch (error) {
        console.error('Error fetching directory data:', error);
    }
}

// Function to populate the directory section with data
function populateDirectory(data) {
    const directoryElement = document.getElementById('directory');
    directoryElement.innerHTML = ''; // Clear existing content

    data.forEach(member => {
        const listItem = document.createElement('li');
        listItem.classList.add('directory-item');

        listItem.innerHTML = `
            <img src="${member.logo}" alt="${member.name} logo" class="directory-logo" />
            <h3 class="directory-name">${member.name}</h3>
            <p class="directory-description">${member.description}</p>
            <a href="${member.website}" class="directory-link">Visit Website</a>
        `;

        directoryElement.appendChild(listItem);
    });
}

// Event listener for view controls
document.getElementById('gridView').addEventListener('click', () => {
    document.getElementById('directory').classList.add('directory-grid');
    document.getElementById('directory').classList.remove('directory-list');
});

document.getElementById('listView').addEventListener('click', () => {
    document.getElementById('directory').classList.add('directory-list');
    document.getElementById('directory').classList.remove('directory-grid');
});

// Initialize the directory on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchDirectoryData();
});