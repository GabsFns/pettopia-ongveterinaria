document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token'); // Obter o token armazenado
    const profileIcon = document.getElementById('profileIcon'); // Elemento do ícone de perfil
    const cadastrar = document.getElementById("BttCadastrar");
    const entrar = document.getElementById("BttEntrar");

    if (token) {
        // Se o token existir, exiba o ícone de perfil
        profileIcon.style.display = 'flex';
        cadastrar.style.display = 'none';
        entrar.style.display = 'none';
        // Adicione um evento de clique para redirecionar o usuário ao dashboard
        profileIcon.addEventListener('click', function () {
            location.href = "http://localhost/TCCfaetec/Client/Php/dashboard.php";
        });
    } else {
        // Se o token não existir, esconda o ícone ou exiba o botão de login
        profileIcon.style.display = 'none';
      
    }
});