document.addEventListener('DOMContentLoaded', function () {
    const consultarButton = document.getElementById('consultarButton');

    // Função para realizar consulta
    if (consultarButton) {
        consultarButton.addEventListener('click', async function () {
            const token = localStorage.getItem('token');

            if (!token) {
                alert('Você precisa estar logado para realizar uma consulta.');
                window.location.href = '../View/login.html';  // Redireciona para a página de login
                return;
            }

            try {
                const response = await fetch('http://localhost:8081/api/LoginWeb/consultaWeb', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });

                if (response.ok) {
                    const data = await response.text();
                    document.getElementById('resultadoConsulta').textContent = data;
                    document.getElementById('consultaModal').style.display = 'block'; // Exibe o modal
                } else {
                    const error = await response.text();
                    document.getElementById('resultadoConsulta').textContent = error;
                    document.getElementById('consultaModal').style.display = 'block'; // Exibe o modal com a mensagem de erro
                }
            } catch (error) {
                console.error("Erro na requisição:", error);
                document.getElementById('resultadoConsulta').textContent = `Erro na requisição: ${error.message}`;
                document.getElementById('consultaModal').style.display = 'block'; // Exibe o modal com a mensagem de erro
            }
        });
    }

    // Fechar o modal quando o usuário clicar no "X"
    const closeModal = document.getElementsByClassName('close')[0];
    if (closeModal) {
        closeModal.addEventListener('click', function () {
            document.getElementById('consultaModal').style.display = 'none';
        });
    }

    // Fechar o modal quando o usuário clicar fora do conteúdo do modal
    window.addEventListener('click', function (event) {
        const consultaModal = document.getElementById('consultaModal');
        if (event.target == consultaModal) {
            consultaModal.style.display = 'none';
        }
    });
});