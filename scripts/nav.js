document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const siteNav = document.querySelector('.site-nav');

    if (!hamburger || !siteNav) return;

    const openNav = () => {
        siteNav.classList.add('active');
        hamburger.classList.add('is-open');
        hamburger.setAttribute('aria-expanded', 'true');
    };

    const closeNav = () => {
        siteNav.classList.remove('active');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
    };

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        siteNav.classList.toggle('active');
        hamburger.classList.toggle('is-open');
        const isOpen = siteNav.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!siteNav.contains(e.target) && !hamburger.contains(e.target) && siteNav.classList.contains('active')) {
            closeNav();
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && siteNav.classList.contains('active')) {
            closeNav();
            hamburger.focus();
        }
    });

    // Close when a nav link is clicked
    siteNav.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => closeNav());
    });

    // Smooth-scroll for Back to top links
    document.querySelectorAll('a[href="#top"]').forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            closeNav();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
});
