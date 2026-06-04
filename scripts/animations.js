document.addEventListener('DOMContentLoaded', () => {
    const revealTargets = document.querySelectorAll('[data-reveal], [data-stagger-group]');

    if (!('IntersectionObserver' in window)) {
        revealTargets.forEach((target) => {
            target.classList.add('is-visible');
        });
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const target = entry.target;
            target.classList.add('is-visible');

            if (target.matches('[data-stagger-group]')) {
                const items = target.querySelectorAll('[data-stagger-item]');
                items.forEach((item, index) => {
                    item.style.setProperty('--stagger-delay', `${index * 100}ms`);
                });
            }

            currentObserver.unobserve(target);
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -8% 0px'
    });

    revealTargets.forEach((target) => observer.observe(target));
});

