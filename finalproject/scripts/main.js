const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const yearEl = document.querySelector("#copyrightYear");
const modifiedEl = document.querySelector("#lastModifiedDate");

if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
        const isOpen = siteNav.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            siteNav.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });
}

if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
}

if (modifiedEl) {
    modifiedEl.textContent = document.lastModified;
}

export function setWayfinding(pathname) {
    const links = document.querySelectorAll(".site-nav a");
    links.forEach((link) => {
        const href = link.getAttribute("href") || "";
        if (href.endsWith(pathname)) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

const currentPath = window.location.pathname.split("/").pop() || "index.html";
setWayfinding(currentPath);
