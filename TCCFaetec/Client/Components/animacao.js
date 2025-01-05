document.addEventListener("DOMContentLoaded", function() {
    const dropdown = document.querySelector(".dropdown");
    const dropdownToggle = document.querySelector(".dropdown-toggle");

    dropdownToggle.addEventListener("click", function(event) {
        event.preventDefault(); // Evita o redirecionamento padrão do link
        dropdown.classList.toggle("open");
    });
   
});
document.addEventListener("DOMContentLoaded", function() {
    const botao = document.querySelector(".dropdown");
    const dropdownToggle = document.querySelector(".dropdown-toggle");

    dropdownToggle.addEventListener("click", function(event) {
        event.preventDefault(); // Evita o redirecionamento padrão do link
        dropdown.classList.toggle("open");
    });
});

document.querySelector('.sidebar').addEventListener('mouseenter', function() {
    document.querySelector('main').classList.add('expanded');
});

document.querySelector('.sidebar').addEventListener('mouseleave', function() {
    document.querySelector('main').classList.remove('expanded');
});
