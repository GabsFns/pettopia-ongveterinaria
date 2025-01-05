// Script para navegação no sidebar
// Script para navegação no sidebar
document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.menu-link');
    const contentSections = document.querySelectorAll('.content-section');

    // Função para mostrar a seção correspondente
    function showSection(target) {
        // Oculta todas as seções
        contentSections.forEach(section => {
            section.style.display = 'none';
        });
        // Mostra a seção correspondente
        const targetSection = document.getElementById(target);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    }

    // Adiciona o evento de clique a cada link do menu
    menuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Impede o comportamento padrão do link
            const target = this.getAttribute('data-target'); // Pega o valor do data-target
            showSection(target); // Mostra a seção correspondente
        });
    });
    // Para ocultar a seção "perfil" e "dashboard" quando a página carrega
});
