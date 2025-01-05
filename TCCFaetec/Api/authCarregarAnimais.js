
document.addEventListener("DOMContentLoaded", function() {
    //Buscando o id Cliente
    const idCliente = localStorage.getItem('idCliente');

    //Função para buscar os animais cadastrados
    function buscarAnimaisPorCliente() {
        if (!idCliente) {
            console.error('ID do cliente não encontrado.');
            return;
        }
        // Chamando a API do SpringBoot passando o ${idCliente}
        fetch(`http://localhost:8081/api/cliente/ListarAnimais/${idCliente}`)
            .then(response => response.json())  // Passando em JSON
            .then(data => {
                const contentDiv = document.getElementById('content');
                contentDiv.innerHTML = ''; // Limpa o conteúdo atual

                if (data.length === 0) {
                    contentDiv.innerHTML = '<p>Nenhum animal cadastrado para este cliente.</p>';
                    return;
                }

                // Cria as divs para os dados dos animais
                data.forEach(animal => {
                    const card = document.createElement('div');
                    card.classList.add('animal-card');
                    card.setAttribute('data-id-animal', animal.idAnimal);  // Alterado para evitar conflito

                    // Adicionando conteúdo na div
                    card.innerHTML = `
                        <div class="card" onclick="abrirModal2(${animal.idAnimal})">
                            <h2>${animal.nome}</h2>
                            <p><strong>Espécie:</strong> ${animal.especie}</p>
                            <p><strong>Raça:</strong> ${animal.raca || 'Não informada'}</p>
                            <p><strong>Idade:</strong> ${animal.idade}</p>
                            <p><strong>Cor:</strong> ${animal.cor}</p>
                            <p><strong>Peso:</strong> ${animal.peso} kg</p>
                            ${animal.fotoAnimal ? `<img src="data:image/jpeg;base64,${animal.fotoAnimal}" alt="Foto de ${animal.nome}">` : ''}
                        </div>
                    `;
                    contentDiv.appendChild(card);
                });
            })
            .catch(error => console.error('Erro ao buscar animais:', error));
    }

    buscarAnimaisPorCliente();
});
function abrirModal2(animalId) {
    document.getElementById('idAnimalInput').value = animalId;
    
    // Busca os dados do animal pelo ID
    fetch(`http://localhost:8081/api/cliente/ListarAnimais/Modal/${animalId}`)
        .then(response => response.json())
        .then(animal => {
            console.log("Preenchendo campos...");

            console.log("Antes de preencher os campos", document.getElementById('nomeAnimalInput').value);

            // Preenche os campos do modal com os dados do animal
            document.getElementById('nomeAnimalInput').value = animal.nome || 'Nome não informado';
            document.getElementById('especieAnimalInput').value = animal.especie || 'Espécie não informada';
            document.getElementById('racaAnimalInput').value = animal.raca || 'Raça não informada';
            document.getElementById('idadeAnimalInput').value = animal.idade || 'Idade não informada';
            document.getElementById('corAnimalInput').value = animal.cor || 'Cor não informada';
            document.getElementById('pesoAnimalInput').value = animal.peso ? `${animal.peso} kg` : 'Peso não informado';
            document.getElementById('descricaoAnimalInput').value = animal.descricao || 'Sem descrição';

            console.log("Após preencher os campos", document.getElementById('nomeAnimalInput').value);

            // Exibe o modal
            document.getElementById('modalAnimal').style.display = 'block';
        })
        .catch(error => console.error('Erro ao buscar detalhes do animal:', error));
}
function fecharModal() {
    document.getElementById('modalAnimal').style.display = 'none';
}

function EnviarAtualizacaoAnimal() {
    const animalId = document.getElementById('idAnimalInput').value;

    if (!animalId || animalId === "undefined") {
        console.error("ID do animal está indefinido");
        return;
    }

    // Pega o valor do peso e faz a validação
    let pesoCampo = document.getElementById('pesoAnimalInput').value; 
    console.log("Valor do Peso:", pesoCampo); // Verifique o valor

    // Verifica se o valor de peso foi preenchido corretamente
    if (!pesoCampo) {
        console.error("Peso não foi preenchido.");
        return;
    }

    // Tenta substituir ' kg' e converter para número
    pesoCampo = pesoCampo.replace(' kg', '');
    const peso = parseFloat(pesoCampo);

    // Verifica se o peso é um número válido
    if (isNaN(peso)) {
        console.error("Peso inválido ou não numérico.");
        return;
    }

    const AnimalAtualizado = {
        nome: document.getElementById('nomeAnimalInput').value,
        especie: document.getElementById('especieAnimalInput').value,
        raca: document.getElementById('racaAnimalInput').value,
        idade: document.getElementById('idadeAnimalInput').value,
        cor: document.getElementById('corAnimalInput').value,
        peso: peso,
        descricao: document.getElementById('descricaoAnimalInput').value,
        fotoAnimal: document.getElementById('fotoAnimalExibicao').src.split(',')[1] // Pegando a imagem em Base64
    };

    fetch(`http://localhost:8081/api/cliente/atualizarAnimal/${animalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(AnimalAtualizado)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao atualizar os dados do animal');
        }
        return response.json();
    })
    .then(data => {
        console.log('Animal atualizado com sucesso:', data);
        fecharModal();
        Swal.fire({
            title: 'Sucesso!',
            text: 'Animal atualizado com sucesso.',
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then(() => {
            location.reload(); 
            //buscarAnimaisPorCliente(idCliente);
        });
    })
    .catch(error => console.error('Erro ao atualizar os dados do animal:', error));
}
/*function EnviarAtualizacaoAnimal() {
    // Pegando o ID do animal do campo hidden
    const animalId = document.getElementById('idAnimalInput').value;
    console.log(animalId);
    console.log(animal.peso);
    
    if (!animalId || animalId === "undefined") {
        console.error("ID do animal está indefinido");
        return;
    }
    
    const AnimalAtualizado = {
        nome: document.getElementById('modalNome').value,
        especie: document.getElementById('modalEspecie').value,
        raca: document.getElementById('modalRaca').value,
        idade: document.getElementById('modalIdade').value,
        cor: document.getElementById('modalCor').value,
        peso: parseFloat(document.getElementById('modalPeso').value.replace('kg', '')),
        descricao: document.getElementById('modalDescricao').value,
        fotoAnimal: document.getElementById('modalFoto').src.split(',')[1] // Pegando a imagem em Base64
    };
    
    

    fetch(`http://localhost:8081/api/cliente/atualizarAnimal/${animalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(AnimalAtualizado)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao atualizar os dados do animal');
        }
        return response.json();
    })
    .then(data => {
        console.log('Animal atualizado com sucesso:', data);
        fecharModal();
        location.reload(); 
    })
    .catch(error => console.error('Erro ao atualizar os dados do animal:', error));
}*/
// function DeletarAnimal(animalId) {
//     if (!animalId || animalId === "undefined") {
//         console.error("ID do animal está indefinido");
//         return;
//     }

//     // Confirmação antes de deletar
//     const confirmDelete = confirm("Tem certeza que deseja deletar este animal?");
//     if (!confirmDelete) {
//         return; // Sai se o usuário cancelar
//     }

//     fetch(`http://localhost:8081/api/cliente/deletarAnimal/${animalId}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' }
//     })
//     .then(response => {
//         if (response.ok) {
//             // Se a resposta for 204 No Content, não processamos nada
//             if (response.status === 204) {
//                 console.log('Animal deletado com sucesso.');
//                 fecharModal();
//                 location.reload(); 
//                 return; // Sai da função
//             }
//             // Caso contrário, processa o JSON (embora não seja comum com DELETE)
//             return response.json(); 
//         } else {
//             throw new Error('Erro ao deletar o animal');
//         }
//     })
//     .then(data => {
//         if (data) {
//             console.log('Animal deletado com sucesso:', data);
//             location.reload(); 
//         }
//     })
//     .catch(error => console.error('Erro ao deletar o animal:', error));
// }
function cadastrarAnimal2(event) {
    event.preventDefault();

    const form = document.getElementById('animalForm2');
    const formData = new FormData();

    // Adiciona os dados do animal como um objeto
    const animalData = {
        nome: form.nomePet.value,
        especie: form.especie.value,
        sexo: form.sexo.value,
        raca: form.raca2.value,
        idade: form.idade2.value,
        cor: form.cor.value,
        peso: parseFloat(form.peso.value),
        descricao: form.descricaoPet.value,
        adocao: form.adocao.value === 'true', 
        cliente: { idCliente: localStorage.getItem("idCliente") } // O ID do cliente
    };

    // Adiciona os dados do animal ao FormData
    formData.append('animal', JSON.stringify(animalData));

    // Adiciona o arquivo da foto
    const fotoAnimal = form.fotoAnimal.files[0];
    formData.append('fotoAnimal', fotoAnimal);

    // Exibe os dados no console
    console.log("Dados enviados:", animalData);
   
    console.log("Foto enviada:", fotoAnimal); 
    // Exibe o nome do arquivo da foto

    // Envio do FormData
    axios.post('http://localhost:8081/api/cliente/cadastrar/animalNormal', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob'
    })
    .then(response => {
         // Aqui você pode verificar o status da resposta
    if (response.status === 200) {
       console.log("Animal Cadastrado");

       //buscarAnimaisPorCliente();
       window.location.reload;
    } else {
        console.error("Erro ao gerar o PDF:", response.statusText);
    }
    })
    .catch(error => {
        console.error("Erro ao cadastrar o animal: ", error);
    });

    
}

function showFileName(event) {
    const input = event.target;
    const fileName = input.files[0]?.name || "Nenhum arquivo selecionado";
    console.log("Arquivo selecionado:", fileName);
    
    // Exibir o nome do arquivo em algum lugar da página (opcional)
    const fileNameDisplay = document.getElementById("fileNameDisplay");
    if (fileNameDisplay) {
        fileNameDisplay.textContent = fileName;
    }
}