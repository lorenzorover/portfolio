let valorAnterior = document.getElementById('paragrafo-1');
let botaoAnterior = document.getElementById('button-info-1');
const checkBox = document.getElementById('trocar-tema');

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

    // caso o tema escuro nao funcione normalmente, colocar ele aqui
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

    } else {

    }
});