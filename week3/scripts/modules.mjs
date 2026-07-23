const list = document.querySelector('#moduleList');

const items = ['Import/export ready', 'Five Server is serving this page', 'Module script loaded'];

if (list) {
    items.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });
}
