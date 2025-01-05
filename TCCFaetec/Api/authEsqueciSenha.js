document.addEventListener('DOMContentLoaded', () => {
    // Função para abrir um modal
    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
        }
    };

    // Função para fechar um modal
    const closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    };

    // Evento para abrir modais ao clicar em links com atributo data-modal
    document.querySelectorAll('[data-modal]').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const modalId = link.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    // Evento para fechar modais ao clicar no botão de fechar
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modalId = closeBtn.getAttribute('data-close');
            closeModal(modalId);
        });
    });

    // Enviar email para receber o token
    document.getElementById('enviarEmailBtn').addEventListener('click', async (event) => {
        event.preventDefault();
        console.log("Botão clicado"); // Teste inicial
    
        const email = document.getElementById('emailInput').value;
        console.log("Email capturado:", email); // Verificar o valor do email
    
        if (!email) {
            console.log("Erro: Email vazio");
            document.getElementById('emailError').textContent = "Por favor, insira seu email.";
            return;
        }

        document.getElementById('loadingOverlay').style.display = 'flex';
        try {
            console.log("Enviando requisição ao backend...");
            const response = await fetch('http://localhost:8081/api/cliente/esqueci-senha', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            document.getElementById('loadingOverlay').style.display = 'none';
            if (response.ok) {
                console.log("Resposta OK do servidor");
                closeModal('emailModal');
                openModal('tokenModal');
            } else {
                console.log("Erro do servidor:", response.status);
                const data = await response.json();
                document.getElementById('emailError').textContent = data.message || 'Erro ao enviar o token.';
            }
        } catch (error) {
            console.error('Erro:', error);
            document.getElementById('emailError').textContent = 'Erro ao enviar o token. Tente novamente.';
        }
    });

    // Validar o token
    document.getElementById('validarTokenBtn').addEventListener('click', async (event) => {
        event.preventDefault();
        const email = document.getElementById('emailInput').value;
        const token = document.getElementById('tokenInput').value;

        if (!email || !token) {
            document.getElementById('tokenError').textContent = "Por favor, insira o email e o token.";
            return;
        }

        try {
            const response = await fetch('http://localhost:8081/api/cliente/validar-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, token })
            });

            if (response.ok) {
                Swal.fire({
                    title: "Token Validado!",
                    text: "Agora vamos resetar a senha",
                    icon: "success"
                  });
                closeModal('tokenModal');
                openModal('novaSenhaModal');
            } else {
                const data = await response.json();
                document.getElementById('tokenError').textContent = data.message || 'Token inválido.';
            }
        } catch (error) {
            console.error('Erro:', error);
            document.getElementById('tokenError').textContent = 'Erro ao validar o token.';
        }
    });

    // Redefinir a senha
    document.getElementById('resetarSenhaBtn').addEventListener('click', async (event) => {
        event.preventDefault();
        const email = document.getElementById('emailInput').value;
        const newPassword = document.getElementById('newPasswordInput').value;

        if (!newPassword) {
            document.getElementById('senhaError').textContent = "Por favor, insira sua nova senha.";
            return;
        }

        try {
            const response = await fetch('http://localhost:8081/api/cliente/atualizar-senha', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password_Cliente: newPassword })
            });

            if (response.ok) {
                Swal.fire({
                    title: "Senha redefinida com sucesso!",
                    text: "lembre-se de sua senha",
                    icon: "success"
                  });
                closeModal('novaSenhaModal');
                window.location.href = "http://localhost/TCCfaetec/App/View/login.html";
            } else {
                const data = await response.json();
                document.getElementById('senhaError').textContent = data.message || 'Erro ao redefinir a senha.';
            }
        } catch (error) {
            console.error('Erro:', error);
            document.getElementById('senhaError').textContent = 'Erro ao redefinir a senha.';
        }
    });
});