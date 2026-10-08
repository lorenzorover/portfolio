// ==========================================
// Portfólio Lorenzo Rover - app.js (v2.1)
// ==========================================

const VERSAO_APP = '2.1';

// Reset de versão: garante que visitantes recebam configurações limpas da versão atualizada
function verificarResetVersao() {
    const versaoSalva = localStorage.getItem('portfolio_versao');
    if (versaoSalva !== VERSAO_APP) {
        localStorage.clear();
        localStorage.setItem('portfolio_versao', VERSAO_APP);
        localStorage.setItem('portfolio-theme', 'escuro');
    }
}
verificarResetVersao();

document.addEventListener('DOMContentLoaded', () => {
    inicializarTema();
    configurarScrollSpy();
    configurarMenuMobile();
    configurarTeclado();
    configurarNavegacaoSuave();
    configurarBarraProgresso();
});

// ------------------------------------------
// 1. Gerenciamento de Tema (Escuro / Claro)
// ------------------------------------------
function inicializarTema() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const temaSalvo = localStorage.getItem('portfolio-theme');

    // O portfólio sempre inicia no modo escuro por padrão para qualquer usuário
    if (temaSalvo === 'claro') {
        document.body.classList.add('tema__claro');
    } else {
        document.body.classList.remove('tema__claro');
        if (!temaSalvo) {
            localStorage.setItem('portfolio-theme', 'escuro');
        }
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
        const offset = 80;

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
// 7. Navegação e Scroll Snap com Trava Booleana por Subtítulo
// ------------------------------------------
let isAnimatingScroll = false;
let snapTimer = null;
let secaoBloqueadaId = null;
let ultimoScrollPos = window.pageYOffset || document.documentElement.scrollTop;
let direcaoScroll = 'down';

// Booleano para cada seção: se true, o snap está BLOQUEADO para ela (não re-dispara nela mesma)
const snapState = {
    hero: false,
    sobre: false,
    competencias: false,
    tecnologias: false,
    projetos: false,
    formacao: false,
    contato: false
};

// Quando dá trigger em uma seção: ela vira TRUE (travada) e todas as outras viram FALSE (liberadas)
function travarSecao(id) {
    for (const key in snapState) {
        snapState[key] = false;
    }
    if (id && snapState.hasOwnProperty(id)) {
        snapState[id] = true;
    }
    secaoBloqueadaId = id;
}

function animarScrollPara(alvoY, duracao = 333, idSecaoAlvo = null) {
    if (idSecaoAlvo) {
        travarSecao(idSecaoAlvo);
    }
    isAnimatingScroll = true;
    const inicioY = window.pageYOffset || document.documentElement.scrollTop;
    const distancia = alvoY - inicioY;
    let tempoInicial = null;

    function animacao(tempoAtual) {
        if (!tempoInicial) tempoInicial = tempoAtual;
        const decorrido = tempoAtual - tempoInicial;
        const progresso = Math.min(decorrido / duracao, 1);

        // Curva suave e rápida (easeInOutCubic)
        const ease = progresso < 0.5
            ? 4 * progresso * progresso * progresso
            : 1 - Math.pow(-2 * progresso + 2, 3) / 2;

        window.scrollTo(0, inicioY + (distancia * ease));

        if (progresso < 1) {
            requestAnimationFrame(animacao);
        } else {
            setTimeout(() => {
                isAnimatingScroll = false;
            }, 60);
        }
    }

    requestAnimationFrame(animacao);
}

function configurarNavegacaoSuave() {
    const secoes = Array.from(document.querySelectorAll('section[id]'));
    const headerOffset = 76;

    // Inicializa a seção onde o usuário já está no carregamento
    const scrollInicial = window.pageYOffset || document.documentElement.scrollTop;
    for (const secao of secoes) {
        const topo = secao.offsetTop - headerOffset;
        const fundo = topo + secao.offsetHeight;
        if (scrollInicial >= topo && scrollInicial < fundo) {
            travarSecao(secao.id);
            break;
        }
    }
    if (!secaoBloqueadaId && secoes.length > 0) {
        travarSecao(secoes[0].id);
    }

    // Cliques em links do menu: navega em 333ms e trava o subtítulo de destino
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                animarScrollPara(offsetPosition, 333, targetElement.id);
            }
        });
    });

    // Encaixe magnético inteligente com trava booleana
    window.addEventListener('scroll', () => {
        const atual = window.pageYOffset || document.documentElement.scrollTop;
        if (atual > ultimoScrollPos + 3) {
            direcaoScroll = 'down';
        } else if (atual < ultimoScrollPos - 3) {
            direcaoScroll = 'up';
        }
        ultimoScrollPos = atual;

        if (isAnimatingScroll) return;

        // Se o usuário está navegando no meio do corpo de uma seção, garante que ela continue travada
        for (const secao of secoes) {
            const topo = secao.offsetTop - headerOffset;
            const fundo = topo + secao.offsetHeight;
            if (atual >= topo && atual < fundo) {
                if (secaoBloqueadaId !== secao.id && atual > topo + 140) {
                    travarSecao(secao.id);
                }
            }
        }

        clearTimeout(snapTimer);
        snapTimer = setTimeout(() => {
            const scrollAtual = window.pageYOffset || document.documentElement.scrollTop;
            const threshold = 130;

            for (const secao of secoes) {
                const id = secao.id;

                // REGRA 1: Se este subtítulo já deu trigger (boolean === true), PULA! NUNCA re-dispara nela!
                if (snapState[id] === true || secaoBloqueadaId === id) {
                    continue;
                }

                const topo = secao.offsetTop - headerOffset;
                const distancia = Math.abs(scrollAtual - topo);

                // REGRA 2: Só dispara se o usuário estiver rolando na direção daquela seção
                const secaoAbaixo = topo > scrollAtual;
                const secaoAcima = topo < scrollAtual;
                const direcaoValida = (direcaoScroll === 'down' && secaoAbaixo) || (direcaoScroll === 'up' && secaoAcima);

                if (direcaoValida && distancia > 15 && distancia < threshold) {
                    // Dá trigger em outra seção: ela vira TRUE (travada) e a anterior vira FALSE (liberada)
                    animarScrollPara(topo, 333, id);
                    break;
                }
            }
        }, 75);
    }, { passive: true });
}

// ------------------------------------------
// 8. Barra de Progresso de Rolagem (Scroll)
// ------------------------------------------
function configurarBarraProgresso() {
    const progressBar = document.getElementById('scroll-progress-bar');
    if (!progressBar) return;

    function atualizarBarra() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

        if (scrollHeight > 0) {
            const progresso = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = `${Math.min(Math.max(progresso, 0), 100)}%`;
        } else {
            progressBar.style.width = '0%';
        }
    }

    window.addEventListener('scroll', atualizarBarra, { passive: true });
    window.addEventListener('resize', atualizarBarra, { passive: true });
    atualizarBarra();
}
