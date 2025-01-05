document.addEventListener('DOMContentLoaded', function () {
    const cadastarButton = document.getElementById('CadastrarAnimalAdocao');

    // Adiciona evento ao botão de cadastrar animal
    if (cadastarButton) {
        cadastarButton.addEventListener('click', function () {
            const token = localStorage.getItem('token');

            // Verifica se o usuário está logado
            if (!token) {
                alert('Você precisa estar logado para realizar um cadastro');
                window.location.href = '../View/login.html'; // Redireciona para a página de login
            } else {
                // Exibe o modal se o token estiver presente
                document.getElementById('cadastroModal').style.display = 'block'; // Exibe o modal
            }
        });
    }

    // Fechar o modal quando o usuário clicar no "X"
    const closeModal = document.getElementsByClassName('close')[0];
    if (closeModal) {
        closeModal.addEventListener('click', function () {
            document.getElementById('cadastroModal').style.display = 'none';
        });
    }

    // Fechar o modal quando o usuário clicar fora do conteúdo do modal
    window.addEventListener('click', function (event) {
        const cadastroModal = document.getElementById('cadastroModal');
        if (event.target === cadastroModal) {
            cadastroModal.style.display = 'none';
        }
    });
});
function cadastrarAnimal(event) {
    event.preventDefault();

    const form = document.getElementById('animalForm');
    const formData = new FormData();

    // Adiciona os dados do animal como um objeto
    const animalData = {
        nome: form.nome.value,
        especie: form.especie.value,
        sexo: form.sexo.value,
        raca: form.raca2.value,
        idade: form.idade2.value,
        cor: form.cor.value,
        peso: parseFloat(form.peso.value),
        descricao: form.descricao.value,
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
    Swal.fire({
        title: 'Cadastrando animal...',
        text: 'Por favor, aguarde enquanto o animal é cadastrado.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
    
    // Envio do FormData
    axios.post('http://localhost:8081/api/cliente/cadastrar/animal', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob'
    })
    .then(response => {
         // Aqui você pode verificar o status da resposta
         Swal.close();
    if (response.status === 200) {
        abrirModal();
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        
        // Crie um link para download do PDF
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'comprovante_adocao.pdf';
        link.click();  // Simula o clique para download
        
        console.log("PDF gerado e pronto para download.");
    } else {
        console.error("Erro ao gerar o PDF:", response.statusText);
    }
    })
    .catch(error => {
        console.error("Erro ao cadastrar o animal: ", error);
    });

    // Pré-visualização da imagem (opcional)
}

// Função para abrir a modal
function abrirModal() {
    const modal = document.getElementById("pdfModal");
    document.getElementById('cadastroModal').style.display = 'none';
    modal.style.display = "block";
}

// Função para fechar a modal
function closeModal() {
    const modal = document.getElementById("pdfModal");
    modal.style.display = "none";
}

// Função para baixar o PDF
function baixarPDF() {
    if (window.pdfBlob) {
        const url = window.URL.createObjectURL(new Blob([window.pdfBlob], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'comprovante_adocao.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Remove o link após o clique
    } else {
        console.error("PDF não encontrado.");
    }
}

// Fecha a modal se o usuário clicar fora dela
window.onclick = function(event) {
    const modal = document.getElementById("pdfModal");
    if (event.target == modal) {
        closeModal();
    }
}



// Fecha a modal se o usuário clicar fora dela
window.onclick = function(event) {
    const modal = document.getElementById("pdfModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}