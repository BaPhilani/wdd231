const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

function normalizePath(path) {
    return path.split('/').pop() || 'index.html';
}

function updateWayfinding() {
    if (!siteNav) {
        return;
    }

    const current = normalizePath(window.location.pathname);
    siteNav.querySelectorAll('a').forEach((link) => {
        const target = normalizePath(link.getAttribute('href') || '');
        const isCurrent = target === current;
        link.classList.toggle('active', isCurrent);

        if (isCurrent) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('open');
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    siteNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                siteNav.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            siteNav.classList.remove('open');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    updateWayfinding();
}
