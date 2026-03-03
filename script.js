// Aqui vamos guardar todos os temas
let temas = [];

// Função que os arquivos de assunto vão usar
function registrarTema(nome, slides) {
    temas.push({
        nome: nome,
        slides: slides
    });
}

// Variáveis de controle
let temaAtual = null;
let slideAtual = 0;

// Elementos da tela
const titulo = document.getElementById("titulo");
const imagem = document.getElementById("imagem");
const descricao = document.getElementById("descricao");
const btnProximo = document.getElementById("btnProximo");
const sidebar = document.getElementById("sidebar");

// Criar botões da lateral
function criarMenu() {
    temas.forEach((tema, index) => {

        const botao = document.createElement("button");
        botao.textContent = tema.nome;

        botao.onclick = function() {
            temaAtual = index;
            slideAtual = 0;
            mostrarSlide();
        };

        sidebar.appendChild(botao);
    });
}

// Mostrar slide
function mostrarSlide() {

    const slide = temas[temaAtual].slides[slideAtual];

    titulo.textContent = slide.titulo;
    imagem.src = slide.imagem;
    descricao.textContent = slide.descricao;
}

// Botão próximo
btnProximo.onclick = function() {

    slideAtual++;

    if (slideAtual >= temas[temaAtual].slides.length) {
        slideAtual = 0;
    }

    mostrarSlide();
};

// Esperar carregar tudo
window.onload = function() {
    criarMenu();
};