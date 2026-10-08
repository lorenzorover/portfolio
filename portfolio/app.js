// ==========================================
// Portfólio Lorenzo Rover - app.js
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    inicializarTema();
    configurarScrollSpy();
    configurarMenuMobile();
    configurarTeclado();
    configurarScrollDinamico();
    configurarRevealOnScroll();
    configurarSmoothWheelScroll();
});

// ------------------------------------------
// 1. Gerenciamento de Tema (Escuro / Claro)
// ------------------------------------------
function inicializarTema() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const temaSalvo = localStorage.getItem('portfolio-theme');

    if (temaSalvo === 'claro') {
        document.body.classList.add('tema__claro');
    } else if (temaSalvo === 'escuro') {
        document.body.classList.remove('tema__claro');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.body.classList.add('tema__claro');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('tema__claro');
            const ehClaro = document.body.classList.contains('tema__claro');
            localStorage.setItem('portfolio-theme', ehClaro ? 'claro' : 'escuro');
        });
    }
}

// ------------------------------------------
// 2. Navegação Suave & ScrollSpy
// ------------------------------------------
function configurarScrollSpy() {
    const navLinks = document.querySelectorAll('.nav-link');
    const secoes = document.querySelectorAll('section[id]');

    function destacarLinkAtivo() {
        let scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const offset = 140;

        secoes.forEach(secao => {
            const topo = secao.offsetTop - offset;
            const altura = secao.offsetHeight;
            const id = secao.getAttribute('id');

            if (scrollY >= topo && scrollY < topo + altura) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', destacarLinkAtivo, { passive: true });
    destacarLinkAtivo();
}

// ------------------------------------------
// 3. Menu Mobile
// ------------------------------------------
function configurarMenuMobile() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navLinksList = document.getElementById('navbar-links');

    if (menuToggle && navLinksList) {
        menuToggle.addEventListener('click', () => {
            navLinksList.classList.toggle('mobile-active');
        });

        // Fechar ao clicar em qualquer link
        navLinksList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksList.classList.remove('mobile-active');
            });
        });
    }
}

// ------------------------------------------
// 4. Copiar E-mail com Feedback
// ------------------------------------------
function copiarEmail() {
    const email = 'lorenzo.rover66@gmail.com';
    const label = document.getElementById('copy-email-label');

    navigator.clipboard.writeText(email).then(() => {
        mostrarToast('E-mail copiado para a área de transferência!');
        if (label) {
            const textoOriginal = label.innerText;
            label.innerText = 'Copiado com sucesso!';
            setTimeout(() => {
                label.innerText = textoOriginal;
            }, 3000);
        }
    }).catch(() => {
        // Fallback caso clipboard API falhe
        const input = document.createElement('input');
        input.value = email;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        mostrarToast('E-mail copiado para a área de transferência!');
    });
}

function mostrarToast(mensagem) {
    const toast = document.getElementById('toast-notification');
    const msgElem = document.getElementById('toast-message');

    if (!toast) return;

    if (msgElem && mensagem) {
        msgElem.innerText = mensagem;
    }

    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

// ------------------------------------------
// 5. Lightbox para Visualização de Imagens
// ------------------------------------------
function abrirLightbox(src, caption) {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-image');
    const cap = document.getElementById('lightbox-caption');

    if (!modal || !img) return;

    img.src = src;
    if (cap) cap.innerText = caption || '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function fecharLightbox(event) {
    const modal = document.getElementById('lightbox-modal');
    if (!modal) return;

    // Fechar ao clicar no backdrop ou botão
    if (event.target === modal || event.target.closest('.lightbox-close-btn')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function configurarTeclado() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('lightbox-modal');
            if (modal && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

// ------------------------------------------
// 6. Carrossel de Imagens em Projetos
// ------------------------------------------
function navegarCarrossel(carouselId, direcao, event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    if (!slides.length) return;

    let currentIndex = parseInt(carousel.getAttribute('data-current-slide') || '0', 10);
    let nextIndex = currentIndex + direcao;

    if (nextIndex < 0) nextIndex = slides.length - 1;
    if (nextIndex >= slides.length) nextIndex = 0;

    irParaSlide(carouselId, nextIndex, event);
}

function irParaSlide(carouselId, index, event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    if (!slides.length || index < 0 || index >= slides.length) return;

    carousel.setAttribute('data-current-slide', index);

    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// ------------------------------------------
// 7. Scroll Dinâmico (Barra de Progresso, Header & Botão Topo)
// ------------------------------------------
function configurarScrollDinamico() {
    const progressBar = document.getElementById('scroll-progress-bar');
    const header = document.querySelector('.navbar-header');
    const btnScrollTop = document.getElementById('btn-scroll-top');

    function atualizarScroll() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Barra de progresso de leitura
        if (progressBar && totalHeight > 0) {
            const progresso = (scrollY / totalHeight) * 100;
            progressBar.style.width = `${Math.min(100, Math.max(0, progresso))}%`;
        }

        // Header com efeito de elevação dinâmica ao rolar
        if (header) {
            if (scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Botão flutuante Voltar ao Topo
        if (btnScrollTop) {
            if (scrollY > 350) {
                btnScrollTop.classList.add('visible');
            } else {
                btnScrollTop.classList.remove('visible');
            }
        }
    }

    window.addEventListener('scroll', atualizarScroll, { passive: true });
    atualizarScroll();

    if (btnScrollTop) {
        btnScrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ------------------------------------------
// 8. Revelação Suave de Elementos ao Rolar (Scroll Reveal)
// ------------------------------------------
function configurarRevealOnScroll() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const elementos = document.querySelectorAll(
        '.section-header, .about-card, .competency-card, .tech-category, .project-card, .timeline-card, .contact-card'
    );

    if (!('IntersectionObserver' in window)) {
        elementos.forEach(el => el.classList.add('is-revealed'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
    });

    elementos.forEach((el, index) => {
        el.classList.add('reveal-on-scroll');
        const delay = (index % 3) * 0.08;
        el.style.transitionDelay = `${delay}s`;
        observer.observe(el);
    });
}

// ------------------------------------------
// 9. Smooth Wheel Inertia Scroll (Rolagem Macia e Fluida)
// ------------------------------------------
function configurarSmoothWheelScroll() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    // Preservar comportamento nativo em dispositivos touch puros
    if ('ontouchstart' in window && !window.matchMedia('(pointer: fine)').matches) {
        return;
    }

    let targetY = window.pageYOffset || document.documentElement.scrollTop;
    let currentY = targetY;
    let isScrolling = false;
    const ease = 0.1;

    window.addEventListener('wheel', (e) => {
        const lightbox = document.getElementById('lightbox-modal');
        if (lightbox && lightbox.classList.contains('active')) return;
        if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

        e.preventDefault();

        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        targetY = Math.max(0, Math.min(targetY + e.deltaY, maxScroll));

        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(passoScroll);
        }
    }, { passive: false });

    function passoScroll() {
        const delta = targetY - currentY;
        currentY += delta * ease;

        window.scrollTo(0, Math.round(currentY));

        if (Math.abs(delta) > 0.6) {
            requestAnimationFrame(passoScroll);
        } else {
            currentY = targetY;
            window.scrollTo(0, targetY);
            isScrolling = false;
        }
    }

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            targetY = window.pageYOffset || document.documentElement.scrollTop;
            currentY = targetY;
        }
    }, { passive: true });
}

