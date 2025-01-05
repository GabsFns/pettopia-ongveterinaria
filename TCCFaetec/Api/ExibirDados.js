document.addEventListener('DOMContentLoaded', function () {
    let cliente = localStorage.getItem('cliente');
    
    // Verifique se existe algo no localStorage
    if (cliente) {
        try {
            cliente = JSON.parse(cliente); // Parse JSON se possível
        } catch (e) {
            console.error('Erro ao analisar JSON:', e); // Log se o JSON for inválido
            cliente = null;
        }
    } else {
        cliente = null;
    }

    const emailElement = document.getElementById('EmailUser');
    const nomeElement = document.getElementById('NomeUser');
    const cpfInput = document.getElementById('cpf_Cliente');
    const telefoneInput = document.getElementById('telefone_Cliente');
    const dataNascimentoInput = document.getElementById('data_nascimento');
    const emailInput = document.getElementById('email');
    const nomeInput = document.getElementById('nome');

    if (cliente && cliente.email && cliente.nome) {
        emailElement.innerHTML = `<li><span class="menu-text">Email: ${cliente.email}</span></li>`;
        nomeElement.innerHTML = `<span class="menu-text"><h1>Olá, Seja Bem vindo ${cliente.nome}!</h1></span>`;
    } else {
        emailElement.innerHTML = `<li><span class="menu-text">Email não disponível</span></li>`;
        nomeElement.innerHTML = `<span class="menu-text"><h1>Nome não disponivel</h1></span>`;
    }
    if (cliente) {
        nomeInput.value = cliente.nome || ''; 
        cpfInput.value = cliente.cpf || ''; 
        telefoneInput.value = cliente.telefone || ''; 
        dataNascimentoInput.value = cliente.data_nascimento || ''; 
        emailInput.value = cliente.email || ''; 
    }



});