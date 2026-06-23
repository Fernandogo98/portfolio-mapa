// ===== MENU HAMBÚRGUER (RESPONSIVO) =====
const menuToggle = document.getElementById('menu-toggle');
const menuLista = document.querySelector('.menu-lista');

menuToggle.addEventListener('click', () => {
    menuLista.classList.toggle('aberto');
    menuToggle.classList.toggle('ativo');
});

// Fecha o menu automaticamente se clicar em um link (boa prática de UX mobile)
const linksMenu = document.querySelectorAll('.menu-lista a');
linksMenu.forEach(link => {
    link.addEventListener('click', () => {
        menuLista.classList.remove('aberto');
        menuToggle.classList.remove('ativo');
    });
});

// ===== EFEITO 2: DESTACAR LINK DA PÁGINA ATUAL =====
// Pega o nome do arquivo atual (ex: "sobre.html") e marca o link correspondente como ativo
const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';

linksMenu.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === paginaAtual) {
        link.classList.add('ativo');
    } else {
        link.classList.remove('ativo');
    }
});

// ===== EFEITO 3: FILTRO DE PROJETOS POR CATEGORIA =====
const botoesFiltro = document.querySelectorAll('.filtro-botao');
const cardsProjeto = document.querySelectorAll('.card-projeto');
const semResultados = document.getElementById('sem-resultados');

botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
        // Remove "ativo" de todos os botões e adiciona só no clicado
        botoesFiltro.forEach(b => b.classList.remove('ativo'));
        botao.classList.add('ativo');

        const categoriaEscolhida = botao.getAttribute('data-filtro');
        let visiveis = 0;

        cardsProjeto.forEach(card => {
            const categoriaCard = card.getAttribute('data-categoria');

            if (categoriaEscolhida === 'todos' || categoriaCard === categoriaEscolhida) {
                card.classList.remove('escondido');
                visiveis++;
            } else {
                card.classList.add('escondido');
            }
        });

        // Mostra mensagem se nenhum card estiver visível
        semResultados.style.display = visiveis === 0 ? 'block' : 'none';
    });
});

// ===== VALIDAÇÃO DO FORMULÁRIO DE CONTATO =====
const formContato = document.getElementById('form-contato');

if (formContato) {
    const campoNome = document.getElementById('nome');
    const campoEmail = document.getElementById('email');
    const campoAssunto = document.getElementById('assunto');
    const campoMensagem = document.getElementById('mensagem');
    const mensagemSucesso = document.getElementById('mensagem-sucesso');

    // Função que verifica se o e-mail tem um formato válido (algo@algo.algo)
    function emailValido(texto) {
        const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return padraoEmail.test(texto);
    }

    // Mostra uma mensagem de erro embaixo de um campo específico
    function mostrarErro(campo, elementoErro, mensagem) {
        campo.classList.add('campo-invalido');
        elementoErro.textContent = mensagem;
    }

    // Limpa o erro de um campo (quando ele está válido)
    function limparErro(campo, elementoErro) {
        campo.classList.remove('campo-invalido');
        elementoErro.textContent = '';
    }

    formContato.addEventListener('submit', (evento) => {
        evento.preventDefault(); // impede o envio padrão (recarregar a página)

        let formularioValido = true;

        if (campoNome.value.trim().length < 3) {
            mostrarErro(campoNome, document.getElementById('erro-nome'), 'Digite seu nome completo (mínimo 3 letras).');
            formularioValido = false;
        } else {
            limparErro(campoNome, document.getElementById('erro-nome'));
        }

        if (!emailValido(campoEmail.value.trim())) {
            mostrarErro(campoEmail, document.getElementById('erro-email'), 'Digite um e-mail válido (ex: nome@exemplo.com).');
            formularioValido = false;
        } else {
            limparErro(campoEmail, document.getElementById('erro-email'));
        }

        if (campoAssunto.value.trim().length < 3) {
            mostrarErro(campoAssunto, document.getElementById('erro-assunto'), 'Digite o assunto da mensagem.');
            formularioValido = false;
        } else {
            limparErro(campoAssunto, document.getElementById('erro-assunto'));
        }

        if (campoMensagem.value.trim().length < 10) {
            mostrarErro(campoMensagem, document.getElementById('erro-mensagem'), 'Escreva uma mensagem com pelo menos 10 caracteres.');
            formularioValido = false;
        } else {
            limparErro(campoMensagem, document.getElementById('erro-mensagem'));
        }

        if (formularioValido) {
            mensagemSucesso.classList.add('visivel');
            formContato.reset();

            setTimeout(() => {
                mensagemSucesso.classList.remove('visivel');
            }, 4000);
        } else {
            mensagemSucesso.classList.remove('visivel');
        }
    });
}