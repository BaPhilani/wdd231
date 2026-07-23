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

function updateSiteInfo() {
    if (lastModifiedDate) {
        const modified = document.lastModified || new Date().toISOString();
        lastModifiedDate.textContent = formatDate(modified);
    }

    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
}

window.updateSiteInfo = updateSiteInfo;
updateSiteInfo();
