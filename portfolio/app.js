paginaInicio();

let valorAnterior;
let botaoAnterior;

function esconderParagrafos() {
    // Desativar os parágrafos das informações sobre mim da página

    document.querySelectorAll('.paragrafo__button').forEach(paragrafo => {
        paragrafo.style.display = 'none';
    });
}

function paginaInicio() {
    esconderParagrafos();
    document.getElementById('paragrafo-1');
    // caso o tema escuro nao funcione normalmente, colocar ele aqui
}

function mostrarParagrafo(valor) {
    const valorAtual = document.getElementById('paragrafo-' + valor);
    const botaoAtual = document.getElementById('button-info-' + valor);
    // colocar o css do botao selecionado aqui também

    if (valor > 0 && valor < 7) {
        valorAtual.style.display = 'block'; // ou flex
        botaoAtual.classList.add('nome do css aqui');

        if (valorAnterior !== undefined) {
            valorAnterior.style.display = 'none';
            
        }

        if (botaoAnterior !== undefined) {
            botaoAnterior.classList.remove('');
        }
    
        botaoAnterior = botaoAtual;
        valorAnterior = valorAtual;
    }
}

const checkBox = document.getElementById('trocar-tema');

checkBox.addEventListener('change', function() {

    if (checkBox.checked) {

    } else {

    }
});