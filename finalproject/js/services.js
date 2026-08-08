const listEl = document.querySelector("#serviceCards");
const modal = document.querySelector("#serviceModal");
const modalBody = document.querySelector("#modalBody");
const filterButtons = document.querySelectorAll("[data-filter]");
const sortSelect = document.querySelector("#sortBy");

let services = [];
let activeCategory = "all";

function readSavedPreference() {
    return localStorage.getItem("pavi-service-filter") || "all";
}

function savePreference(category) {
    localStorage.setItem("pavi-service-filter", category);
}

function byPreference(item) {
    return activeCategory === "all" || item.category.toLowerCase() === activeCategory;
}

function sortServices(items) {
    if (!sortSelect) return items;
    if (sortSelect.value === "price-asc") {
        return [...items].sort((a, b) => a.priceUsd - b.priceUsd);
    }
    if (sortSelect.value === "price-desc") {
        return [...items].sort((a, b) => b.priceUsd - a.priceUsd);
    }
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
}

function openModal(service) {
    if (!modal || !modalBody) return;
    modalBody.innerHTML = `
        <h3>${service.name}</h3>
        <p><strong>Category:</strong> ${service.category}</p>
        <p><strong>Price:</strong> US$${service.priceUsd}</p>
        <p><strong>Estimated Duration:</strong> ${service.duration}</p>
        <p><strong>Status:</strong> ${service.availability}</p>
        <p>${service.summary}</p>
        <button class="btn btn-primary" id="closeModalBtn" type="button">Close</button>
    `;
    modal.showModal();
    const closeButton = document.querySelector("#closeModalBtn");
    closeButton?.addEventListener("click", () => modal.close());
}

function renderCards() {
    if (!listEl) return;
    const filtered = services.filter(byPreference);
    const sorted = sortServices(filtered);

    listEl.innerHTML = sorted.map((service) => `
        <article class="card">
            <h3>${service.name}</h3>
            <p><strong>Category:</strong> ${service.category}</p>
            <p class="price">US$${service.priceUsd}</p>
            <p><strong>Availability:</strong> ${service.availability}</p>
            <p>${service.summary}</p>
            <button class="btn btn-secondary" type="button" data-id="${service.id}">View Details</button>
        </article>
    `).join("");

    listEl.querySelectorAll("button[data-id]").forEach((button) => {
        button.addEventListener("click", () => {
            const id = Number(button.getAttribute("data-id"));
            const service = services.find((item) => item.id === id);
            if (service) openModal(service);
        });
    });
}

function bindFilters() {
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            activeCategory = button.getAttribute("data-filter") || "all";
            savePreference(activeCategory);
            renderCards();
        });
    });

    sortSelect?.addEventListener("change", renderCards);
}

async function loadServices() {
    try {
        const response = await fetch("data/services.json");
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        services = await response.json();
        activeCategory = readSavedPreference();
        renderCards();
        bindFilters();
    } catch (error) {
        if (listEl) {
            listEl.innerHTML = `<p>Unable to load services right now. ${error.message}</p>`;
        }
    }
}

loadServices();
