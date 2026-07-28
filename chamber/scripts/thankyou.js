const summaryFields = {
    firstName: document.getElementById('summaryFirstName'),
    lastName: document.getElementById('summaryLastName'),
    email: document.getElementById('summaryEmail'),
    phone: document.getElementById('summaryPhone'),
    organization: document.getElementById('summaryOrganization'),
    timestamp: document.getElementById('summaryTimestamp')
};

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) {
        return timestamp || 'Not provided';
    }

    return date.toLocaleString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

const params = new URLSearchParams(window.location.search);

summaryFields.firstName.textContent = params.get('firstName') || 'Not provided';
summaryFields.lastName.textContent = params.get('lastName') || 'Not provided';
summaryFields.email.textContent = params.get('email') || 'Not provided';
summaryFields.phone.textContent = params.get('phone') || 'Not provided';
summaryFields.organization.textContent = params.get('organization') || 'Not provided';
summaryFields.timestamp.textContent = formatTimestamp(params.get('timestamp'));
