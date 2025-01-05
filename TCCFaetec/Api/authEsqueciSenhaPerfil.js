// Abrir o modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Fechar o modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}





// Enviar email para receber o token
async function enviarEmail(event) {
    event.preventDefault();
    const email = document.getElementById('emailInput').value;

    if (!email) {
        document.getElementById('emailError').textContent = "Por favor, insira seu email.";
        return;
    }

    // Exibe a tela de carregamento
    document.getElementById('loadingOverlay').style.display = 'flex';

    try {
        const response = await fetch('http://localhost:8081/api/cliente/esqueci-senha', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }) // Enviando email como JSON
        });

        // Oculta a tela de carregamento após a resposta
        document.getElementById('loadingOverlay').style.display = 'none';

        if (response.ok) {
           
            closeModal('emailModal');
            openModal('tokenModal');
        } else {
            const data = await response.json();
            document.getElementById('emailError').textContent = data.message || 'Erro ao enviar o token.';
        }
    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('loadingOverlay').style.display = 'none';  // Oculta em caso de erro também
        document.getElementById('emailError').textContent = 'Erro ao enviar o token. Tente novamente.';
    }
}



// Validar o token
async function validarToken(event) {
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
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, token }) // Enviando email e token como JSON
        });

        if (response.ok) {
            alert('Token validado com sucesso!');
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
}



// Redefinir a senha
async function resetarSenha(event) {
    event.preventDefault();
    const newPassword = document.getElementById('newPasswordInput').value;
    const email = document.getElementById('emailInput').value;
    
    const login= "http://localhost/TCCfaetec/App/View/login.html";

    
    const updateData = {
        email: email,
        password_Cliente: newPassword
    };
    try {
        const response = await fetch('http://localhost:8081/api/cliente/atualizar-senha', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData)
        });
    
        if (response.ok) {
            // Tentar parsear como JSON
            try {
                const data = await response.json();
                alert(data.message);  // Exibe a mensagem de sucesso
            } catch (error) {
                // Se não for JSON, tratar como texto simples
                const text = await response.text();
                alert(text);  // Exibe a mensagem de texto
            }
            closeModal('novaSenhaModal');
            location.href = login;  // Redirecionar para a página de login
        } else {
            // Tratar a resposta de erro como JSON ou texto
            try {
                const data = await response.json();
                document.getElementById('senhaError').textContent = data.message || 'Erro ao redefinir a senha.';
            } catch (error) {
                const errorText = await response.text();
                document.getElementById('senhaError').textContent = errorText || 'Erro ao redefinir a senha.';
            }
        }
    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('senhaError').textContent = 'Erro ao redefinir a senha.';
    }
}