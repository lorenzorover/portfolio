esconderParagrafos();

let valorAnterior;

function esconderParagrafos() {
    // Desativar os parágrafos das informações sobre mim da página

    document.querySelectorAll('.paragrafo__button').forEach(paragrafo => {
        paragrafo.style.display = 'none';
    });
}

function mostrarParagrafo(valor) {
    const valorAtual = document.getElementById('paragrafo-' + valor);

    if (valor > 0 && valor < 7) {
        valorAtual.style.display = 'block'; // ou flex

        if (valorAnterior !== undefined) {
            valorAnterior.style.display = 'none';
        }
    
        valorAnterior = valorAtual;
    }
}

const checkBox = document.getElementById('trocar-tema');

checkBox.addEventListener('change', function() {

    if (checkBox.checked) {

    } else {

    }
});