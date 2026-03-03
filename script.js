let temas = [];
let temaAtual = null;
let slideAtual = 0;

const titulo = document.getElementById("titulo");
const imagem = document.getElementById("imagem");
const descricao = document.getElementById("descricao");
const btnProximo = document.getElementById("btnProximo");
const btnAnterior = document.getElementById("btnAnterior");
const sidebar = document.getElementById("sidebar");

// 🔎 Buscar automaticamente todos os JSON
async function carregarTemas() {
    let contador = 1;
    let continuar = true;

    while (continuar) {
        try {
            const resposta = await fetch(`assuntos/assunto${contador}.json`);

            if (!resposta.ok) {
                continuar = false;
                break;
            }

            const dados = await resposta.json();
            temas.push(dados);

            contador++;

        } catch (erro) {
            continuar = false;
        }
    }

    criarMenu();
}

// Criar botões na lateral
function criarMenu() {
    temas.forEach((tema, index) => {

        const botao = document.createElement("button");
        botao.textContent = tema.nome;

        botao.onclick = function () {
            temaAtual = index;
            slideAtual = 0;
            mostrarSlide();
        };

        sidebar.appendChild(botao);
    });
}

// Mostrar slide atual
function mostrarSlide() {
    const slide = temas[temaAtual].slides[slideAtual];

    titulo.textContent = slide.titulo;
    imagem.src = slide.imagem;
    descricao.textContent = slide.descricao;
}

// Próximo
btnProximo.onclick = function () {
    if (temaAtual === null) return;

    slideAtual++;

    if (slideAtual >= temas[temaAtual].slides.length) {
        slideAtual = 0;
    }

    mostrarSlide();
};

// Anterior
btnAnterior.onclick = function () {
    if (temaAtual === null) return;

    slideAtual--;

    if (slideAtual < 0) {
        slideAtual = temas[temaAtual].slides.length - 1;
    }

    mostrarSlide();
};

window.onload = function () {
    carregarTemas();
};
