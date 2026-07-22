// This file handles fetching and displaying spotlight advertisements for chamber members.
// It retrieves data from members.json, filtering for gold or silver members and displaying their details randomly.

async function fetchSpotlights() {
    try {
        const response = await fetch('../data/members.json');
        const members = await response.json();
        const spotlights = members.filter(member => member.membershipLevel === 'gold' || member.membershipLevel === 'silver');
        displaySpotlights(spotlights);
    } catch (error) {
        console.error('Error fetching spotlight members:', error);
    }
}

function displaySpotlights(spotlights) {
    const spotlightContainer = document.getElementById('spotlight-ads');
    spotlightContainer.innerHTML = ''; // Clear existing content

    if (spotlights.length === 0) {
        spotlightContainer.innerHTML = '<p>No spotlight members available.</p>';
        return;
    }

    // Shuffle the array to display random members
    const shuffledSpotlights = spotlights.sort(() => 0.5 - Math.random()).slice(0, 3); // Display 3 random members

    shuffledSpotlights.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('spotlight-member');
        memberDiv.innerHTML = `
            <img src="${member.logo}" alt="${member.companyName} logo" />
            <h3>${member.companyName}</h3>
            <p>${member.phone}</p>
            <p>${member.address}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        spotlightContainer.appendChild(memberDiv);
    });
}

// Call the fetchSpotlights function to load the spotlight advertisements
fetchSpotlights();