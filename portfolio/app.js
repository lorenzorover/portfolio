let valorAnterior = document.getElementById('paragrafo-1');
let botaoAnterior = document.getElementById('button-info-1');
let paginas = document.querySelectorAll('.paginas');
let titulos = document.querySelectorAll('.titulos');
let seta1 = document.getElementById('seta-1');
const paragrafoDiscord = document.getElementById("paragrafo-discord");
let botoesProjeto = document.querySelectorAll(".botoes__projeto");

const tituloInicial1 = document.getElementById('titulo-1');
const tituloInicial2 = document.getElementById('titulo-2');
const tituloInicial3 = document.getElementById('titulo-3');
const paragrafoInicial = document.getElementById('paragrafo-inicial');

// 
const checkBox = document.getElementById('trocar-tema');
const iconeInfo = document.querySelector('.icone__info');
const balaoInfo = document.querySelector('.balao__info');
const iconeSol = document.getElementById('svg-sol');
const iconeLua = document.getElementById('svg-lua');

let balaoMouse = false;

// Linha azul sublinhada dos botoes de "Sobre mim"
const linha = document.createElement("span");
linha.id = "linha-botao";

balaoInfo.style.display = 'none';

iniciarElementosPaginas();
carregarEfeitosPagina1();

function esconderParagrafos() {
    document.querySelectorAll('.paragrafo__button').forEach(paragrafo => {
        paragrafo.style.display = 'none';
    });
}

function iniciarElementosPaginas() {
    const paginaInicial = document.getElementById('pagina-1');
    // paginaInicial.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Sempre que der F5 na página, ela começara no inicio
    esconderParagrafos();
    valorAnterior.style.display = 'flex';
    botaoAnterior.appendChild(linha);
    linha.classList.add('linha-ativada');

    // Aplica o tema do switch manualmente
    paginas.forEach(pagina => {
        pagina.classList.add('tema__escuro');
        pagina.classList.remove('tema__claro');
    });

    // Aplica o icone correspondente manualmente
    iconeLua.classList.add('svg__switch__mostrar');
    iconeSol.classList.remove('svg__switch__mostrar');
}

//Mostrar o parágrafo do texto de informações sobre mim correspondente
function mostrarParagrafo(valor) {
    const valorAtual = document.getElementById('paragrafo-' + valor);
    const botaoAtual = document.getElementById('button-info-' + valor);
    
    if (valorAnterior !== valorAtual) {
        if (valor > 0 && valor < 7) {
            linha.classList.remove('linha-ativada'); //remove a linha para aplicar o transition

            if (valorAnterior !== undefined) {
                valorAnterior.style.display = 'none';
            }
    
            if (botaoAnterior !== undefined) {
                botaoAnterior.removeChild(linha);
            }

            valorAtual.style.display = 'flex'; // ou flex
            botaoAtual.appendChild(linha);
            
            setTimeout(() => { // timeout para aplicar corretamente o transition
                linha.classList.add('linha-ativada');
            }, 10);

            botaoAnterior = botaoAtual;
            valorAnterior = valorAtual;
        }
    }
}

function mostrarDialogCertificado(valor) {
    dialogModal = document.getElementById('dialog-certificado-' + valor);

    if (valor > 0 && valor < 4) {
        dialogModal.showModal();
        // document.body.classList.add('scroll')
    }
}

function mostrarDialogProjeto(valor) {
    dialogModal = document.getElementById('dialog-projeto-' + valor);

    if (valor > 0 && valor < 4) {
        dialogModal.showModal();
        // document.body.classList.add('scroll')
    }
}

function fecharDialog() {
    dialogModal.close();
    // document.body.classList.remove('scroll');
}

// dialogModal.addEventListener('close', function() {
//     document.body.classList.remove('scroll');
// });


//Mudança de Temas Escuro e Claro
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

//Mostrar o balao ao passar o mouse sobre o icone
iconeInfo.addEventListener('mouseenter', function() {
    balaoInfo.classList.add('mostrar');
    balaoMouse = true;
});

iconeInfo.addEventListener('mouseleave', function() {
    balaoInfo.classList.remove('mostrar');
});

//Mostrar o balao ao passar o mouse sobre o balao
balaoInfo.addEventListener('mouseenter', function() {
    balaoInfo.classList.add('mostrar');
    balaoMouse = true;
});

balaoInfo.addEventListener('mouseleave', function() {
    balaoInfo.classList.remove('mostrar');
});

//Direcionamento da página pelas setas
function direcionarPagina(numeroPagina){
    paginas.forEach(pagina => {
        const paginaConferir = 'pagina-' + String(numeroPagina);

        if (pagina.id === paginaConferir) {
            pagina.scrollIntoView({ behavior: 'smooth', block: 'start' }); //end para centralizar a página começando por baixo
        }
    });
}

function mostrarTitulos() {
    setTimeout(function() {
        tituloInicial1.classList.add('mostrar');
    }, 1000);
    setTimeout(function() {
        tituloInicial2.classList.add('mostrar');
    }, 2000);
    setTimeout(function() {
        tituloInicial3.classList.add('mostrar');
    }, 3000);
    setTimeout(function() {
        paragrafoInicial.classList.add('mostrar');
    }, 3850);

    setTimeout(function() {
        titulos.forEach(titulo => {
            titulo.classList.add('fixo');
        });
        paragrafoInicial.classList.add('fixo');
    }, 4000);
}

//Carregamento Página 1 
function carregarEfeitosPagina1() {

    // Após a primeira vez, já é salvo o balão, a seta e os titulos
    if (localStorage.getItem("animacao-exibida") === "true") {
        seta1.classList.add('mostrar');
        balaoInfo.style.display = 'block';
        iconeInfo.classList.add('mostrar');
        mostrarTitulos();
        seta1.classList.add('reduzir__delay');
        iconeInfo.classList.add('reduzir__delay');

        return;
    }

    mostrarTitulos();
    
    setTimeout(function() {
        seta1.classList.add('mostrar');
        balaoInfo.style.display = 'block';
        iconeInfo.classList.add('mostrar');
        iconeInfo.classList.add('icone__info__opacidade:hover');
    }, 3700);

    setTimeout(function() {
        titulos.forEach(titulo => {
            titulo.classList.add('fixo');
            seta1.classList.add('reduzir__delay');
            iconeInfo.classList.add('reduzir__delay');

            localStorage.setItem("animacao-exibida", "true");
        });
    }, 4000);

    //Mostrar o balao após determinado tempo
    setTimeout(function() {
        balaoInfo.classList.add('mostrar');
    }, 6000);

    setTimeout(function() {
        if (balaoMouse === false) {
            balaoInfo.classList.remove('mostrar');
        }
    }, 13000);
}

//Função copiar nick do discord
// function copiarMensagem() {
//     navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
//         if (result.state === "granted" || result.state === "prompt") {
//             navigator.clipboard.writeText("Rakard");

//             paragrafoDiscord.innerText = "Copiado!";

//             setTimeout(function() {
//                 paragrafoDiscord.innerText = "Nick: Rakard";
//             }, 2500);
//         }
//       });
// }

// Mudar conteúdo do botão de expandir projeto
function mudarBotaoProjeto(valor) {
    const botao = document.getElementById('botao-projeto-mostrar-' + valor);

    const conteudo = document.getElementById('content' + valor);

    botoesProjeto.forEach(function(botao) {
        botao.textContent = "Expandir";
    });

    // Retornos invertidos devido ao delay de aplicação do "show" do bootstrap
    conteudo.classList.contains('show') ? botao.textContent = "Expandir" : botao.textContent = "Esconder";
}