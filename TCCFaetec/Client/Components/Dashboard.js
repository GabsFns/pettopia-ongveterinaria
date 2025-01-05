document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logoutButton');
    const confirmLogoutModal = document.getElementById('confirmLogoutModal');
    const closeModal = document.getElementById('closeModal');
    const confirmLogout = document.getElementById('confirmLogout');
    const cancelLogout = document.getElementById('cancelLogout');

    // Verificar token no carregamento da página (para páginas protegidas)
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Sessão expirada, faça login novamente.');
        window.location.href = '../../App/View/login.html';  // Redireciona para a página de login
    }

    // Evento popstate para impedir voltar para páginas protegidas após logout
    window.addEventListener('popstate', function (event) {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Sessão expirada, faça login novamente.');
            window.location.href = '../../App/View/login.html';  // Redireciona para a página de login
        }
    });

    // Abrir o modal de confirmação ao clicar no botão de logout
    if (logoutButton) {
        logoutButton.addEventListener('click', function (e) {
            e.preventDefault();  // Impede o comportamento padrão do link
            confirmLogoutModal.style.display = 'block';  // Exibe o modal
        });
    }

    // Fechar o modal
    if (closeModal) {
        closeModal.addEventListener('click', function () {
            confirmLogoutModal.style.display = 'none';  // Oculta o modal
        });
    }

    // Confirmar logout e redirecionar
    if (confirmLogout) {
        confirmLogout.addEventListener('click', function () {
            console.log('Token antes de remover:', localStorage.getItem('token'));
        console.log('idCliente antes de remover:', localStorage.getItem('idCliente'));
        console.log('cliente antes de remover:', localStorage.getItem('cliente'));

        // Remove os dados do localStorage
        localStorage.removeItem('token');  
        localStorage.removeItem('idCliente');
        localStorage.removeItem('cliente');

        console.log('Token depois de remover:', localStorage.getItem('token'));
        console.log('idCliente depois de remover:', localStorage.getItem('idCliente'));
        console.log('cliente depois de remover:', localStorage.getItem('cliente'));

        alert('Você saiu com sucesso!');
            window.location.href = '../../App/View/login.html';  // Redireciona para a página de login
        });
    }

    // Cancelar logout e fechar o modal
    if (cancelLogout) {
        cancelLogout.addEventListener('click', function () {
            confirmLogoutModal.style.display = 'none';  // Oculta o modal
        });
    }

    // Fechar o modal ao clicar fora do conteúdo
    window.addEventListener('click', function (event) {
        if (event.target === confirmLogoutModal) {
            confirmLogoutModal.style.display = 'none';
        }
    });
});

const sections = document.querySelectorAll('.sub-caixa');
let currentIndex = 0;

// Inicializa a primeira seção como ativa
sections[currentIndex].classList.add('active');

// Navegar para a direita
document.getElementById('nextButton').addEventListener('click', () => {
    sections[currentIndex].classList.remove('active'); // Remove a classe ativa da seção atual
    currentIndex = (currentIndex + 1) % sections.length; // Avança para a próxima seção
    sections[currentIndex].classList.add('active'); // Adiciona a classe ativa à nova seção
});

// Navegar para a esquerda
document.getElementById('prevButton').addEventListener('click', () => {
    sections[currentIndex].classList.remove('active'); // Remove a classe ativa da seção atual
    currentIndex = (currentIndex - 1 + sections.length) % sections.length; // Retrocede para a seção anterior
    sections[currentIndex].classList.add('active'); // Adiciona a classe ativa à nova seção
});