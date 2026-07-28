const timestampField = document.getElementById('timestamp');
const membershipLinks = document.querySelectorAll('[data-modal]');
const dialogs = document.querySelectorAll('dialog.membership-modal');

function setTimestamp() {
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }
}

function closeDialog(dialog) {
    if (dialog.open) {
        dialog.close();
    }
}

function setupDialogs() {
    dialogs.forEach((dialog) => {
        dialog.addEventListener('click', (event) => {
            const rect = dialog.getBoundingClientRect();
            const clickedOutside =
                event.clientX < rect.left
                || event.clientX > rect.right
                || event.clientY < rect.top
                || event.clientY > rect.bottom;

            if (clickedOutside) {
                closeDialog(dialog);
            }
        });

        const closeButton = dialog.querySelector('.dialog-close');
        closeButton?.addEventListener('click', () => closeDialog(dialog));
    });

    membershipLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const modal = document.getElementById(link.dataset.modal);
            modal?.showModal();
        });
    });
}

setTimestamp();
setupDialogs();