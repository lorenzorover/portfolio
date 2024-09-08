let valorAnterior = document.getElementById('paragrafo-1');
let botaoAnterior = document.getElementById('button-info-1');
let paginas = document.querySelectorAll('.paginas');
const checkBox = document.getElementById('trocar-tema');
const iconeInfo = document.querySelector('.icone__info');
const balaoInfo = document.querySelector('.balao__info');
const iconeSol = document.querySelector('.svg__sol');
const iconeLua = document.querySelector('.svg__lua');

let balaoMouse = false;

paginaInicio();

function esconderParagrafos() {
    // Desativar os parágrafos das informações sobre mim da página

    document.querySelectorAll('.paragrafo__button').forEach(paragrafo => {
        paragrafo.style.display = 'none';
    });
}

function paginaInicio() {
    esconderParagrafos();
    valorAnterior.style.display = 'block';
    botaoAnterior.classList.add('button-info-selecionado');

    paginas.forEach(pagina => {
        pagina.classList.add('tema__escuro');
        pagina.classList.remove('tema__claro');
    });

    iconeLua.classList.add('svg__switch__mostrar');
    iconeSol.classList.remove('svg__switch__mostrar');
}

function mostrarParagrafo(valor) {
    const valorAtual = document.getElementById('paragrafo-' + valor);
    const botaoAtual = document.getElementById('button-info-' + valor);
    
    if (valorAnterior !== valorAtual) {
        if (valor > 0 && valor < 7) {
            valorAtual.style.display = 'block'; // ou flex
            botaoAtual.classList.add('button-info-selecionado');
    
            if (valorAnterior !== undefined) {
                valorAnterior.style.display = 'none';
            }
    
            if (botaoAnterior !== undefined) {
                botaoAnterior.classList.remove('button-info-selecionado');
            }
        
            botaoAnterior = botaoAtual;
            valorAnterior = valorAtual;
        }
    }
}

checkBox.addEventListener('change', function() {

    if (checkBox.checked) {
        paginas.forEach(pagina => {
            pagina.classList.add('tema__escuro');
            pagina.classList.remove('tema__claro');

            iconeLua.classList.add('svg__switch__mostrar');
            iconeSol.classList.remove('svg__switch__mostrar');
        });
    } else {
        paginas.forEach(pagina => {
            pagina.classList.add('tema__claro');
            pagina.classList.remove('tema__escuro');

            iconeSol.classList.add('svg__switch__mostrar');
            iconeLua.classList.remove('svg__switch__mostrar');
        });
    }
});

iconeInfo.addEventListener('mouseenter', function() {
    balaoInfo.classList.add('mostrar');
    balaoMouse = true;
});

iconeInfo.addEventListener('mouseleave', function() {
    balaoInfo.classList.remove('mostrar');
});

balaoInfo.addEventListener('mouseenter', function() {
    balaoInfo.classList.add('mostrar');
    balaoMouse = true;
});

balaoInfo.addEventListener('mouseleave', function() {
    balaoInfo.classList.remove('mostrar');
});

setTimeout(function() {
    balaoInfo.classList.add('mostrar');
}, 4000);

setTimeout(function() {
    if (balaoMouse === false) {
        balaoInfo.classList.remove('mostrar');
    }
}, 11000);

function direcionarPagina(numeroPagina){
    paginas.forEach(pagina => {
        const paginaConferir = 'pagina-' + String(numeroPagina);

        if (pagina.id === paginaConferir) {
            pagina.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    });
}