/* ==========================================================================
   US CONSULT — JAVASCRIPT
   Smooth scroll, header opacity change, mobile menu functionality
   ========================================================================== */

// ========== HEADER SCROLL EFFECT ==========
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========== SMOOTH SCROLL FOR NAVIGATION LINKS ==========
const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile, .cta-button');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute('href');
        if (targetId) {
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Close mobile menu if open
                mobileNav.classList.remove('active');

                // Smooth scroll to target
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========== MOBILE MENU TOGGLE ==========
const burgerMenu = document.getElementById('burger-menu');
const mobileNav = document.getElementById('mobile-nav');

burgerMenu.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking outside
mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) {
        mobileNav.classList.remove('active');
    }
});

// ========== PAGE LOAD ANIMATION TRIGGER ==========
// Ensure hero content container becomes visible after DOM loads
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
});

// ========== PARALLAX EFFECT FOR HERO & ABOUT ==========
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;

    // 1. Hero Parallax
    const hero = document.querySelector('.hero-section');
    const heroBg = document.querySelector('.hero-background');

    if (scrolled <= window.innerHeight) {
        if (window.innerWidth > 768) {
            if (heroBg) {
                heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
            } else if (hero) {
                hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
            }
        }
    }

    // 2. About Us Parallax
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection && window.innerWidth > 768) {
        const aboutTop = aboutSection.offsetTop;
        const aboutHeight = aboutSection.offsetHeight;

        // Apply parallax only when section is in viewport
        if (scrolled > aboutTop - window.innerHeight && scrolled < aboutTop + aboutHeight) {
            // Speed: 0.3 (30% of scroll speed)
            const offset = (scrolled - aboutTop) * 0.3;
            // Центрируем, чтобы орел оставался в кадре
            aboutSection.style.backgroundPositionY = `calc(50% + ${offset}px)`;
        }
    }

    // 3. Philosophy Parallax
    const philosophySection = document.querySelector('.philosophy-section');
    if (philosophySection && window.innerWidth > 768) {
        const sectionTop = philosophySection.offsetTop;
        const sectionHeight = philosophySection.offsetHeight;

        if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
            // Фон двигается на 25% скорости скролла (очень subtle)
            const offset = (scrolled - sectionTop) * 0.25;
            // Центрируем, чтобы лошадь оставалась в кадре
            philosophySection.style.backgroundPositionY = `calc(50% + ${offset}px)`;
        }
    }

    // 4. Advantages & Stats Parallax
    const advantagesSection = document.querySelector('.advantages-section');
    if (advantagesSection && window.innerWidth > 768) {
        const sectionTop = advantagesSection.offsetTop;
        const sectionHeight = advantagesSection.offsetHeight;

        if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
            // Фон двигается на 30% скорости скролла
            const offset = (scrolled - sectionTop) * 0.3;
            // Добавляем 50% чтобы картинка оставалась центрированной
            advantagesSection.style.backgroundPositionY = `calc(50% + ${offset}px)`;
        }
    }
});

// ========== VERTICAL NAVIGATION (DOTS) ==========
const sections = document.querySelectorAll('section[id]');
const navDots = document.querySelectorAll('.nav-dot');

// Smooth scroll for dots
navDots.forEach(dot => {
    dot.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Auto-activate dots on scroll
window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-section') === current) {
            dot.classList.add('active');
        }
    });
});

// ========== SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER) ==========
const observerOptions = {
    threshold: 0.15, // trigger when 15% of element is visible
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Запустить счетчик для цифр
            if (entry.target.classList.contains('stat-item')) {
                const numberElement = entry.target.querySelector('.stat-number');
                if (numberElement && !numberElement.classList.contains('counted')) {
                    animateCounter(numberElement);
                    numberElement.classList.add('counted');
                }
            }

            // Stop observing once visible to maintain performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Анимация счетчика
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 секунды
    const startTime = Date.now();

    // Определяем суффикс (+ или M)
    let suffix = '+';
    if (target === 350) {
        suffix = 'M'; // для $350M
    } else {
        suffix = '+';
    }

    function update() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function для плавности
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * target);

        if (target === 350) {
            element.textContent = '$' + current + suffix;
        } else {
            element.textContent = current + suffix;
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            // Финальное значение
            if (target === 350) {
                element.textContent = '$' + target + suffix;
            } else {
                element.textContent = target + suffix;
            }
        }
    }

    update();
}

document.addEventListener('DOMContentLoaded', () => {
    const aboutTitle = document.querySelector('.about-title');
    const aboutTexts = document.querySelectorAll('.about-text');
    const philosophyTitle = document.querySelector('.philosophy-title');
    const philosophyTexts = document.querySelectorAll('.philosophy-text');
    const servicesTitle = document.querySelector('.services-title');
    const serviceCards = document.querySelectorAll('.service-card');
    const advantagesTitle = document.querySelector('.advantages-title');
    const advantageCards = document.querySelectorAll('.advantage-card');
    const statsTitle = document.querySelector('.stats-title');
    const statItems = document.querySelectorAll('.stat-item');
    const contactsCta = document.querySelector('.contacts-cta');
    const contactCard = document.querySelector('.contact-card');

    if (aboutTitle) observer.observe(aboutTitle);
    aboutTexts.forEach(text => observer.observe(text));

    if (philosophyTitle) observer.observe(philosophyTitle);
    philosophyTexts.forEach(text => observer.observe(text));

    if (servicesTitle) observer.observe(servicesTitle);
    serviceCards.forEach(card => observer.observe(card));

    if (advantagesTitle) observer.observe(advantagesTitle);
    advantageCards.forEach(card => observer.observe(card));
    if (statsTitle) observer.observe(statsTitle);
    statItems.forEach(item => observer.observe(item));

    // Contacts section scroll reveal
    const contactsLeft = document.querySelector('.contacts-left');
    const contactsRight = document.querySelector('.contacts-right');
    if (contactsLeft) observer.observe(contactsLeft);
    if (contactsRight) observer.observe(contactsRight);
});

// ========== SPOTLIGHT EFFECT FOR SERVICE CARDS ==========
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Размер spotlight (радиус в пикселях)
        const spotlightSize = 200;

        // Обновляем позицию radial-gradient
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        card.style.setProperty('--spotlight-x', `${xPercent}%`);
        card.style.setProperty('--spotlight-y', `${yPercent}%`);
        card.style.setProperty('--spotlight-size', `${spotlightSize}px`);

        // Применяем gradient через ::after
        const gradient = `radial-gradient(
            circle ${spotlightSize}px at ${xPercent}% ${yPercent}%,
            transparent 0%,
            rgba(42, 45, 53, 0.94) 100%
        )`;

        card.style.setProperty('--spotlight-gradient', gradient);
    });

    card.addEventListener('mouseleave', () => {
        // Сброс при уходе курсора
        card.style.setProperty('--spotlight-gradient', 'radial-gradient(circle 0px at 50% 50%, transparent 0%, rgba(42, 45, 53, 0.94) 0%)');
    });
});

// ========== CONTACT FORM MODAL ==========
const modal = document.getElementById('contactModal');
const modalClose = document.getElementById('modalClose');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

// Кнопки, которые открывают модальное окно
const openModalButtons = document.querySelectorAll('.open-modal, .cta-button, .card-cta, .contacts-button');

// Открыть модальное окно
function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Закрыть модальное окно
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    // Сброс формы
    setTimeout(() => {
        contactForm.style.display = 'block';
        formSuccess.classList.remove('active');
        contactForm.reset();
        // Убрать ошибки
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('has-error');
        });
    }, 300);
}

// Открытие по клику на кнопки
openModalButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
});

// Закрытие по кнопке X
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

// Закрытие по клику на overlay
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });
}

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Валидация и отправка формы
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Валидация
        let isValid = true;
        const formGroups = contactForm.querySelectorAll('.form-group');

        formGroups.forEach(group => {
            const input = group.querySelector('.form-input');
            if (input && input.hasAttribute('required') && !input.value.trim()) {
                group.classList.add('has-error');
                input.classList.add('error');
                isValid = false;
            } else if (input) {
                group.classList.remove('has-error');
                input.classList.remove('error');
            }
        });

        if (!isValid) return;

        // Сбор данных формы
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Имитация отправки (заменить на реальный endpoint)
        console.log('Form data:', data);

        // Показать сообщение об успехе
        contactForm.style.display = 'none';
        formSuccess.classList.add('active');

        // Автоматическое закрытие через 3 секунды
        setTimeout(() => {
            closeModal();
        }, 3000);
    });

    // Убирать ошибку при вводе
    contactForm.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('input', () => {
            const group = input.closest('.form-group');
            if (group) {
                group.classList.remove('has-error');
                input.classList.remove('error');
            }
        });
    });
}
