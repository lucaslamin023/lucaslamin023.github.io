document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileMenu();
    initTypingEffect();
    initStatsCounter();
    initCarousel();
    initProjectModal();
    initProjectFilter();
    initSkillBars();
});

/* --- 1. HEADER SCROLL & ACTIVE LINKS --- */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link dynamic update
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });
}

/* --- 2. MOBILE MENU TOGGLE --- */
function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    if (toggleBtn && navLinks) {
        toggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = toggleBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            });
        });
    }
}

/* --- 3. DYNAMIC TYPING EFFECT --- */
function initTypingEffect() {
    const targetEl = document.getElementById('typed-text');
    if (!targetEl) return;

    const phrases = [
        "Analista de Dados",
        "BI & Machine Learning",
        "Auditoria de Estoque"
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
        const currentPhrase = phrases[phraseIdx];

        if (isDeleting) {
            targetEl.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
            typeSpeed = 40;
        } else {
            targetEl.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIdx === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* --- 3. ANIMATED STATS COUNTER --- */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function startCount() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target') || '0', 10);
            const prefix = stat.getAttribute('data-prefix') || '';
            const suffix = stat.getAttribute('data-suffix') || '';
            let count = 0;
            const duration = 1800;
            const step = Math.ceil(target / (duration / 30));

            const timer = setInterval(() => {
                count += step;
                if (count >= target) {
                    count = target;
                    clearInterval(timer);
                }
                stat.textContent = `${prefix}${count.toLocaleString('pt-BR')}${suffix}`;
            }, 30);
        });
    }

    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !animated) {
                animated = true;
                startCount();
            }
        }, { threshold: 0.2 });
        observer.observe(statsSection);
    }
}

/* --- 4. CARROSSEL DE PROJETOS (ARRÁSTÁVEL COM MOUSE E TOUCH - 3 CARDS) --- */
function initCarousel() {
    const container = document.querySelector('.carousel-container');
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationId = 0;
    let hasMoved = false;

    function getVisibleCardsCount() {
        const width = window.innerWidth;
        if (width <= 768) return 1;
        if (width <= 1024) return 2;
        return 3;
    }

    function getMaxIndex() {
        const visibleCount = getVisibleCardsCount();
        return Math.max(0, cards.length - visibleCount);
    }

    function getMoveAmountForIndex(index) {
        if (cards.length === 0) return 0;
        const gap = 24;
        const cardWidth = cards[0].getBoundingClientRect().width;
        return (cardWidth + gap) * index;
    }

    function renderDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        const maxIdx = getMaxIndex();

        for (let i = 0; i <= maxIdx; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateCarousel() {
        const maxIdx = getMaxIndex();
        currentIndex = Math.min(Math.max(0, currentIndex), maxIdx);

        prevTranslate = -getMoveAmountForIndex(currentIndex);
        currentTranslate = prevTranslate;
        setTrackPosition();

        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex >= maxIdx;

        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    }

    function setTrackPosition() {
        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function goToSlide(index) {
        track.classList.remove('dragging');
        currentIndex = index;
        updateCarousel();
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) goToSlide(currentIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < getMaxIndex()) goToSlide(currentIndex + 1);
        });
    }

    function dragStart(e) {
        if (e.target.closest('button, a')) return;

        isDragging = true;
        hasMoved = false;
        startX = getPositionX(e);
        track.classList.add('dragging');
        if (container) container.classList.add('active-drag');
        animationId = requestAnimationFrame(animation);
    }

    function dragMove(e) {
        if (!isDragging) return;
        const currentPosition = getPositionX(e);
        const diff = currentPosition - startX;
        if (Math.abs(diff) > 5) {
            hasMoved = true;
        }
        currentTranslate = prevTranslate + diff;
    }

    function dragEnd() {
        if (!isDragging) return;
        isDragging = false;
        cancelAnimationFrame(animationId);
        if (container) container.classList.remove('active-drag');
        track.classList.remove('dragging');

        const movedBy = currentTranslate - prevTranslate;
        const threshold = 60;

        if (movedBy < -threshold && currentIndex < getMaxIndex()) {
            currentIndex += 1;
        } else if (movedBy > threshold && currentIndex > 0) {
            currentIndex -= 1;
        }

        updateCarousel();
    }

    function getPositionX(e) {
        return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    }

    function animation() {
        setTrackPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (hasMoved) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);
    });

    if (container) {
        container.addEventListener('mousedown', dragStart);
        window.addEventListener('mousemove', dragMove);
        window.addEventListener('mouseup', dragEnd);

        container.addEventListener('touchstart', dragStart, { passive: true });
        window.addEventListener('touchmove', dragMove, { passive: true });
        window.addEventListener('touchend', dragEnd);
    }

    window.addEventListener('resize', () => {
        renderDots();
        updateCarousel();
    });

    renderDots();
    updateCarousel();
}

/* --- 5. MODAL INTERATIVO DE PROJETOS (IFRAME HTML VIEWER) --- */
function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const iframe = document.getElementById('modal-iframe');
    const modalTitle = document.getElementById('modal-project-title');
    const closeBtn = document.querySelector('.modal-close-btn');
    const openExternalBtn = document.getElementById('modal-external-link');

    if (!modal || !iframe) return;

    window.openProjectModal = function (projectTitle, htmlPath) {
        if (modalTitle) modalTitle.textContent = projectTitle;
        iframe.src = htmlPath;
        if (openExternalBtn) openExternalBtn.href = htmlPath;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    function closeModal() {
        modal.classList.remove('active');
        iframe.src = 'about:blank';
        document.body.style.overflow = 'auto';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* --- 6. FILTRO DE CATEGORIA DOS PROJETOS --- */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = (card.getAttribute('data-category') || '').split(' ');
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });

            initCarousel();
        });
    });
}

/* --- 7. ANIMAÇÃO DE BARRAS DE HABILIDADE --- */
function initSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    const aboutSection = document.getElementById('sobre');

    if (aboutSection && skillFills.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                skillFills.forEach(fill => {
                    const targetWidth = fill.style.width || '80%';
                    fill.style.width = '0%';
                    setTimeout(() => {
                        fill.style.width = targetWidth;
                    }, 100);
                });
            }
        }, { threshold: 0.2 });
        observer.observe(aboutSection);
    }
}

/* --- 8. HELPER COPY TO CLIPBOARD --- */
window.copyToClipboard = function (text, label) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`Copiado: ${label}!`);
    }).catch(err => {
        showToast(`Erro ao copiar: ${err}`);
    });
};

function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
