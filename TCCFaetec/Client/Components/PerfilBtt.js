document.getElementById('editarDados').addEventListener('click', function(event) {
    // Habilita os campos de entrada
    event.preventDefault();
    document.getElementById('nome').disabled = false;
    document.getElementById('telefone_Cliente').disabled = false;
    document.getElementById('email').disabled = false;

    // Exibe o botão de salvar e oculta o botão de editar
    document.getElementById('salvarDados').style.display = 'inline';
    document.getElementById('editarDados').style.display = 'none';
});

document.getElementById('salvarDados').addEventListener('click', function(event) {
    event.preventDefault();

    // Validação dos campos
    const nome = document.getElementById('nome').value.trim();
    const cpf_Cliente = document.getElementById('cpf_Cliente').value.trim();
    console.log(document.getElementById('cpf_Cliente').value.trim());
    const telefone_Cliente = document.getElementById('telefone_Cliente').value.trim();
    const data_nascimento = document.getElementById('data_nascimento').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!nome || !cpf_Cliente || !telefone_Cliente || !data_nascimento || !email) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return; // Interrompe o envio se algum campo estiver vazio
    }

    // Se todos os campos forem preenchidos, os dados são preparados para envio
    
    const data = {
        nome: nome,
        cpf: cpf_Cliente,
        telefone: telefone_Cliente,
        data_nascimento: data_nascimento,
        email: email
    };

    console.log(data);

    // Pegando o ID do cliente do localStorage
    const id = localStorage.getItem('idCliente');

    // Fazendo a requisição de atualização
    fetch(`http://localhost:8081/api/cliente/atualizar/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Obtém os dados da resposta para atualizar o localStorage
        } else {
            throw new Error('Erro ao atualizar os dados');
        }
    })
    
    .then(updatedUserData => {
        // Atualiza os dados no localStorage com as informações atualizadas
        localStorage.setItem('cliente', JSON.stringify(updatedUserData));

        // Atualiza o DOM para refletir os novos dados (sem recarregar)
        document.getElementById('nome').value = updatedUserData.nome;
        document.getElementById('cpf_Cliente').value = updatedUserData.cpf;
        document.getElementById('telefone_Cliente').value = updatedUserData.telefone;
        document.getElementById('data_nascimento').value = updatedUserData.data_nascimento;
        document.getElementById('email').value = updatedUserData.email;

        Swal.fire({
            title: "Dados Atualizados!",
            text: "Dados Atualizados com Sucesso",
            icon: "success",
            timer: 3000, // Tempo de exibição do alerta (3 segundos)
            timerProgressBar: true
          }).then(() => {
            setTimeout(() => {
              location.reload(); // Recarrega a página após 3 segundos
            }, 2000);
          });
      
          // Desabilita os campos novamente
          document.getElementById('nome').disabled = true;
          document.getElementById('cpf_Cliente').disabled = true;
          document.getElementById('telefone_Cliente').disabled = true;
          document.getElementById('data_nascimento').disabled = true;
          document.getElementById('email').disabled = true;
      
          // Atualiza a interface
          document.getElementById('salvarDados').style.display = 'none';
          document.getElementById('editarDados').style.display = 'inline';
        })
        .catch(error => {
          alert(error.message);
        });
    });
