







const idCliente = localStorage.getItem('idCliente');


document.addEventListener("DOMContentLoaded", function() {
    const realizarDenunciaBtn = document.getElementById("realizarDenunciaBtn");
    const visualizarDenunciaBtn = document.getElementById("visualizarDenunciaBtn");
    const realizarDenunciaDiv = document.getElementById("RealizarDenuncia");
    const visualizarDenunciaDiv = document.getElementById("VisualizarDenuncia");

    // Função para mostrar a seção de realizar denúncia
    realizarDenunciaBtn.addEventListener("click", function() {
        realizarDenunciaDiv.style.display = "block"; // Mostra a div de realizar denúncia
        visualizarDenunciaDiv.style.display = "none"; // Esconde a div de visualizar denúncia
    });

    // Função para mostrar a seção de visualizar denúncia
    visualizarDenunciaBtn.addEventListener("click", function() {
        visualizarDenunciaDiv.style.display = "block"; // Mostra a div de visualizar denúncia
        realizarDenunciaDiv.style.display = "none"; // Esconde a div de realizar denúncia
        buscarDenuncias(idCliente); 
    });



    function buscarDenuncias(idCliente) {
        fetch(`http://localhost:8081/api/cliente/BuscarDenuncias/${idCliente}`)  // URL para buscar as denúncias
            
        .then(response => {
            
                if (!response.ok) {
                    throw new Error('Erro ao buscar denúncias');
                }
                return response.json();  // Converte a resposta em JSON
            })
          
            .then(denuncias => {
                exibirDenuncias(denuncias);  // Exibe as denúncias na tabela
            })
            .catch(error => {
                console.error(error);
                alert('Erro ao carregar denúncias. Tente novamente.');
            });
    }

    // Função para exibir as denúncias na tabela
    function exibirDenuncias(denuncias) {
        const tbody = document.querySelector('#tabelaDenuncias tbody');
        tbody.innerHTML = '';  // Limpa a tabela antes de inserir os dados

        denuncias.forEach(denuncia => {

            
            const row = document.createElement('tr');

            // Cria as células da tabela para cada propriedade da denúncia
            const cellId = document.createElement('td');
            cellId.textContent = denuncia.idDenuncia;

            const cellTipo = document.createElement('td');
            cellTipo.textContent = denuncia.tipoDenuncia || 'N/A';  // Se não houver tipo, exibe 'N/A'

            const cellDescricao = document.createElement('td');
            cellDescricao.textContent = denuncia.descricao;

            const statusSpan = document.createElement('td');
        statusSpan.textContent = denuncia.statusGeral;

        // Se o status for "PENDENTE", aplica o fundo amarelo ao redor do texto
        if (denuncia.statusGeral === 'PENDENTE') {
            statusSpan.style.backgroundColor = 'yellow';  // Preenchimento com cor amarela
            statusSpan.style.borderRadius = '10px';  // Bordas arredondadas
            statusSpan.style.padding = '5px 10px'; 
           
            statusSpan.style.display = 'inline-block';  // Para não pegar toda a célula
            statusSpan.style.margin = '15px 0px'; 
        }
            if (denuncia.statusGeral === 'ANDAMENTO') {
                statusSpan.style.backgroundColor = 'blue';
                statusSpan.style.borderRadius = '10px';  // Bordas arredondadas
                statusSpan.style.padding = '5px 10px'; 
                statusSpan.style.display = 'inline-block';  // Para não pegar toda a célula
                statusSpan.style.margin = '15px 0px'; 
            }
            if (denuncia.statusGeral === 'CANCELADO') {
                statusSpan.style.backgroundColor = 'red';
                statusSpan.style.borderRadius = '10px';  // Bordas arredondadas
                statusSpan.style.padding = '5px 10px'; 
               
                statusSpan.style.display = 'inline-block';  // Para não pegar toda a célula
                statusSpan.style.margin = '15px 0px'; 
            }
            if (denuncia.statusGeral === 'CONCLUIDO') {
                statusSpan.style.backgroundColor = 'green';
                statusSpan.style.borderRadius = '10px';  // Bordas arredondadas
                statusSpan.style.padding = '5px 10px'; 
               
                statusSpan.style.display = 'inline-block';  // Para não pegar toda a célula
                statusSpan.style.margin = '15px 0px'; 
            }

            const cellData = document.createElement('td');
            cellData.textContent = denuncia.dataDenuncia;


            const editarBtn = document.createElement('button');

            const cellAcoes = document.createElement('td');
           
            editarBtn.classList.add('editarBtt', 'editarBtt');  

            editarBtn.addEventListener('click', function() {
                mostrarModalEdicao(denuncia);  // Chama a função para exibir o modal com os dados da denúncia
            });
           
            const excluirBtn = document.createElement('button');
            
            excluirBtn.classList.add('excluirBtt'); // Adiciona a classe CSS
    
            // Adiciona o evento de exclusão ao clicar no botão
            excluirBtn.addEventListener('click', async () => {
                var idDenuncia = denuncia.idDenuncia;
                console.log('ID da Denúncia:', idDenuncia); // Verifica se o ID está correto
                
                const confirmacao = confirm("Tem certeza que deseja excluir esta denúncia?");
                if (confirmacao) {
                    try {
                        const response = await fetch(`http://localhost:8081/api/cliente/ExcluirDenuncia/${idDenuncia}`, {
                            method: 'DELETE',
                        });
            
                        if (response.ok) {
                            alert('Denúncia excluída com sucesso!');
                            buscarDenuncias(idCliente) // Atualiza a lista de denúncias após exclusão
                        } else {
                            alert('Erro ao excluir a denúncia. Tente novamente.');
                        }
                    } catch (error) {
                        console.error('Erro ao excluir denúncia:', error);
                    }
                }
            });


            // Adiciona as células na linha da tabela
            row.appendChild(cellId);
            row.appendChild(cellTipo);
            row.appendChild(cellDescricao);
            row.appendChild(statusSpan);
            row.appendChild(cellData);
             // Adiciona o botão na célula e a célula na linh
            

            cellAcoes.appendChild(editarBtn);
            cellAcoes.appendChild(excluirBtn);
            row.appendChild(cellAcoes); 
            

            // Adiciona a linha ao corpo da tabela
            tbody.appendChild(row);
        });
    }

    function mostrarModalEdicao(denuncia) {
        const modal = document.getElementById('modalEdicao');
        const closeModal = document.getElementById('closeModal');
    
        // Preenche os campos do modal com os dados da denúncia
        document.getElementById('idDenuncia').value = denuncia.idDenuncia;
        document.getElementById('descricaoEdicao').value = denuncia.descricao;
        document.getElementById('statusGeral').value = denuncia.statusGeral;
        document.getElementById('dataDenuncia').value = denuncia.dataDenuncia;
        document.getElementById('tipoDenunciaModal2').value = denuncia.tipoDenuncia;
        document.getElementById('tipoDenunciaModal2').disabled = true;
        // Exibe o modal
        modal.style.display = 'block';
    
        // Fecha o modal quando o usuário clicar no "X"
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    
        // Fecha o modal quando o usuário clicar fora do modal
        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }
});

document.getElementById("SalvarEdicao").addEventListener("click", async function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const idDenuncia = document.getElementById('idDenuncia').value;
    const tipoDenucias = document.getElementById('tipoDenunciaModal2').value; // Captura o valor do select
    const descricao = document.getElementById('descricaoEdicao').value;
    const statusGeral = document.getElementById('statusGeral').value;
    const dataDenuncia = document.getElementById('dataDenuncia').value;

    // Cria o objeto com os dados da denúncia atualizados
    const denunciaAtualizada = {
        idDenuncia: idDenuncia,
        tipoDenucias: tipoDenucias, // Inclui o tipo de denúncia atualizado
        descricao: descricao,
        statusGeral: statusGeral,
        dataDenuncia: dataDenuncia
    };

    try {
        // Envia a requisição PUT para atualizar a denúncia
        const response = await fetch(`http://localhost:8081/api/cliente/AtualizarDenuncia/${idDenuncia}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(denunciaAtualizada)
        });

        if (response.ok) {
            Swal.fire({
                title: "Denúncia Realizada!",
                text: "Denúncia realizada com sucesso",
                icon: "success",
                confirmButtonText: "OK"
              }).then(() => {
                document.getElementById('modalEdicao').style.display = 'none'; // Fecha o modal
                location.reload(); // Recarrega a página após o usuário fechar o alerta
              });
            buscarDenuncias(idCliente);  // Atualiza a tabela com as denúncias
        } else {
            alert("Erro ao atualizar a denúncia. Tente novamente.");
        }
    } catch (error) {
        console.error("Erro ao atualizar a denúncia:", error);
    }
});
