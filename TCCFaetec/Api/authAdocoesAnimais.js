function carregarAnimaisParaAdocao() {
  fetch("http://localhost:8081/api/cliente/doacao-validas")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao buscar os animais para adoção");
      }
      return response.json();
    })
    .then((adocoes) => {
      const container = document.getElementById("animais-adocao-container");
      container.innerHTML = ""; // Limpa o container antes de adicionar novos cards

      // Filtra as adoções válidas
      console.log(adocoes);
      const animaisParaAdocao = adocoes.filter(
        (adocao) => adocao.valido === true
      );

      if (animaisParaAdocao.length === 0) {
        // Exibe a mensagem se não houver animais disponíveis para adoção
        container.innerHTML =
          '<p class="textoNenhumAnimal">Nenhum animal disponível para adoção no momento.</p>';
        return;
      }

      // Para cada adoção válida, cria um card e insere no container
      animaisParaAdocao.forEach((adocao) => {
        const card = document.createElement("div");
        card.className = "card";

        // Acessa as propriedades do AnimalModel a partir da adoção
        const animal = adocao.animal; // Objeto AnimalModel dentro da adoção
        console.log(animal);
        console.log(adocoes);
        // Converte a imagem de bytes para Base64
        const fotoBase64 = animal.fotoAnimal
          ? `data:image/jpeg;base64,${animal.fotoAnimal}`
          : "default-image.jpg"; // Se não tiver foto, usa uma imagem padrão

        card.innerHTML = `
                    <img src="${fotoBase64}" alt="Foto de ${animal.nome}">
                    <div class="card-body">
                        <h3>${animal.nome}</h3>
                        <p>Espécie: ${animal.especie}</p>
                        <p>Raça: ${animal.raca}</p>
                        <p>Idade: ${animal.idade}</p>
                        <p>Cor: ${animal.cor}</p>
                        <p>Peso: ${animal.peso}kg</p>
                        <p>Sexo: ${animal.sexo}</p>
                        <p>Descrição: ${animal.descricao}</p>
                        <button onclick="abrirModalAnimal2(${animal.idAnimal})">Visualizar</button>
                    </div>
                `;

        container.appendChild(card);
      });
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("animais-adocao-container").innerHTML =
        "<p>Erro ao carregar os animais para adoção.</p>";
    });
}















function carregarComprovantes(idCliente) {
  // Recebe o ID do cliente como parâmetro
  console.log(`ID Cliente: ${idCliente}`);
  fetch(`http://localhost:8081/api/cliente/doacoes/${idCliente}`) // Chama o endpoint para buscar os comprovantes do cliente
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao buscar os comprovantes");
      }
      return response.json();
    })
    .then((adocoes) => {
      console.log("Dados da API:", adocoes);
      console.log(adocoes);
      const container = document.querySelector(".Comprovantes");
      container.innerHTML = ""; // Limpa o container antes de adicionar novos cards

      if (adocoes.length === 0) {
        container.innerHTML =
          '<p class="textoNenhumComprovante">Nenhum comprovante disponível.</p>';
        return;
      }

      // Cria um card para cada comprovante
      adocoes.forEach((adocao) => {
        console.log(adocao);
        const fotoBase64 = adocao.animal.fotoAnimal
          ? `data:image/jpeg;base64,${adocao.animal.fotoAnimal}`
          : "default-image.jpg";
        const card = document.createElement("div");
        card.className = "cardcomprovante";

        card.innerHTML = `
                    <img src="${fotoBase64}" alt="Foto do animal">
              <div id="DadosComprovante">     
    <h3>Comprovante: ${adocao.codigoComprovante}</h3>
    
    <p>Status: ${adocao.statusAdocao}</p>
    <p>Data de Adoção: ${new Date(adocao.dataAdocao).toLocaleDateString()}</p>
      <div id="BttComprovante">   
    <button onclick="baixarComprovante('${
      adocao.idAdocao
    }')" class="botao-download">
      <i class="fas fa-download"></i>
    </button>
    
    <button onclick="visualizarComprovante('${
      adocao.idAdocao
    }')" class="botao-visualizar">
      <i class="fas fa-eye"></i>
    </button>
    </div>
     </div> 
  `;

        container.appendChild(card);
      });
    })
    .catch((error) => {
      console.error(error);
      document.querySelector(".Comprovantes").innerHTML =
        "<p>Erro ao carregar os comprovantes.</p>";
    });
}











// Variável global para armazenar o ID do animal atual
let idAnimalAtual = null; // Inicializa como null

function abrirModalAnimal2(idAnimal) {
  // Busca os dados do animal pelo ID através da API
  fetch(`http://localhost:8081/api/cliente/ListarAnimais/Modal/${idAnimal}`) // Rota do seu backend para buscar o animal pelo ID
    .then((response) => response.json())
    .then((animal) => {
      // Preenche os campos do modal com os dados do animal
      document.getElementById("modalNome").innerText = animal.nome;
      document.getElementById("modalEspecie").innerText = animal.especie;
      document.getElementById("modalRaca").innerText =
        animal.raca || "Não informada";
      document.getElementById("modalIdade").innerText = animal.idade;
      document.getElementById("modalCor").innerText = animal.cor;
      document.getElementById("modalPeso").innerText = animal.peso + " kg";
      document.getElementById("modalDescricao").innerText =
        animal.descricao || "Sem descrição";

      // Se houver uma foto, ela será exibida
      if (animal.fotoAnimal) {
        document.getElementById(
          "modalFoto"
        ).src = `data:image/jpeg;base64,${animal.fotoAnimal}`;
        document.getElementById("modalFoto").style.display = "block";
      } else {
        document.getElementById("modalFoto").style.display = "none";
      }

      // Armazena o ID do animal na variável global
      idAnimalAtual = idAnimal;

      // Exibe o modal
      document.getElementById("modalAnimal").style.display = "block";
    })
    .catch((error) =>
      console.error("Erro ao buscar detalhes do animal:", error)
    );
}

// Manipulador de envio do formulário de envio de documentos
async function enviarDocumentos(event) {
  event.preventDefault();
  const idCliente = localStorage.getItem("idCliente"); // Pega o idCliente do localStorage

  // Verifica se idCliente e idAnimalAtual foram definidos
  if (!idCliente || !idAnimalAtual) {
    document.getElementById("resultMessage").textContent =
      "ID Cliente ou ID Animal não encontrados.";
    return;
  }

  const formData = new FormData();
  formData.append("idCliente", idCliente);
  formData.append("idAnimal", idAnimalAtual); // Utiliza o idAnimal capturado
  formData.append("file", document.getElementById("comprovante").files[0]);

  try {
    const response = await fetch("http://localhost:8081/api/cliente/enviarDocumentosTeste", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const documento = await response.json(); // Chama apenas uma vez
      document.getElementById("resultMessage").textContent = "Documento salvo com sucesso!";
      console.log("Documento salvo:", documento);
   
      Swal.fire({
        icon: 'success',
        title: 'Documento salvo com sucesso!',
        html: `
          <p>Você vai poder visualizar na aba <strong>SOLICITAÇÕES</strong> no seu dashboard.</p>
          <p>Prazo de 3 a 5 dias úteis para análise do comprovante.</p>
          <div class="progress-container">
            <div class="progress-bar" id="progressBar"></div>
          </div>
        `,
        showConfirmButton: false,
        timer: 10000, // Duração de 8 segundos
        didOpen: () => {
          const progressBar = document.getElementById('progressBar');
          let timerInterval = setInterval(() => {
            const width = parseInt(getComputedStyle(progressBar).width);
            const newWidth = width - (width / 30); // Diminui a largura gradualmente
            progressBar.style.width = newWidth + 'px';
          }, 100);
        }
      });

      fecharModalEnvioDocumentos(); // Fecha o modal após o sucesso
    } else {
      const errorMessage = await response.text(); // Capture o texto de erro aqui
      document.getElementById("resultMessage").textContent =
        "Erro ao enviar documentos: " + errorMessage;
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    document.getElementById("resultMessage").textContent =
      "Erro na conexão com o servidor.";
  }
}




/*function baixarComprovante(idAdocao) {
  window.location.href = `http://localhost:8081/api/cliente/doacao/${idAdocao}/download`;
}
function visualizarComprovante(idAdocao) {
  const url = `http://localhost:8081/api/cliente/doacao/${idAdocao}/view`;
  window.open(url, "_blank"); // Abre o PDF em uma nova aba
}*/
function fecharModal() {
  document.getElementById("modalAnimal").style.display = "none";
}

function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// Carrega os animais para adoção quando a página for carregada
// window.onload = carregarAnimaisParaAdocao;
document.addEventListener("DOMContentLoaded", function () {
  carregarOpcoes();
  carregarAnimaisParaAdocao();
  const idCliente = localStorage.getItem("idCliente");
  carregarComprovantes(idCliente);
});
// Função para carregar as opções de espécies e idades













function carregarOpcoes() {
  axios
    .get("http://localhost:8081/api/cliente/opcoes")
    .then(function (response) {
      const data = response.data;
      const especieSelect = document.getElementById("especie");
      const idadeSelect = document.getElementById("idade2");

      // Preenche o select de espécies
      Object.keys(data.especies).forEach(function (especie) {
        const option = document.createElement("option");
        option.value = especie;
        option.text = especie.charAt(0) + especie.slice(1).toLowerCase(); // Formata texto da espécie
        especieSelect.appendChild(option);
      });

      // Limpa as opções anteriores de idades
      idadeSelect.innerHTML = ""; // Limpa antes de adicionar novas opções

      // Preenche o select de idades
      data.idades.forEach(function (idade) {
        const option = document.createElement("option");
        option.value = idade;
        option.text = idade.replace(/_/g, " ").toLowerCase(); // Formata texto da idade
        idadeSelect.appendChild(option);
      });
    })
    .catch(function (error) {
      console.error("Erro ao carregar as opções: ", error);
    });
}
// Função para atualizar o select de raças baseado na espécie escolhida
function atualizarRacas() {
  const especieSelecionada = document.getElementById("especie").value;
  const racaSelect = document.getElementById("raca2");

  // Limpa as opções anteriores de raças
  racaSelect.innerHTML = '<option value="">Selecione...</option>';

  if (especieSelecionada) {
    // Faz a requisição para pegar as raças da espécie selecionada
    axios
      .get(
        `http://localhost:8081/api/cliente/opcoes?especie=${especieSelecionada}`
      )
      .then(function (response) {
        // Verifique se a resposta está na estrutura correta
        const racas = response.data.especies[especieSelecionada];

        // Debug para ver as raças recebidas
        console.log("Raças para a espécie selecionada:", racas);

        // Verifica se a variável 'racas' não é undefined ou null
        if (racas) {
          // Preenche o select de raças
          racas.forEach(function (raca) {
            const option = document.createElement("option");
            option.value = raca;
            option.text = raca.replace(/_/g, " ").toLowerCase(); // Formata texto da raça
            racaSelect.appendChild(option);
          });
          console.log("Raças adicionadas ao select:", racaSelect.innerHTML);
        } else {
          console.error("Nenhuma raça encontrada para a espécie selecionada.");
        }
      })
      .catch(function (error) {
        console.error("Erro ao carregar as raças: ", error);
      });
  }
}
function showFileName() {
  const fileInput = document.getElementById("fileInput");
  const fileNameSpan = document.getElementById("fileName");

  // Verifica se algum arquivo foi selecionado
  if (fileInput.files.length > 0) {
    // Pega o nome do primeiro arquivo selecionado
    const fileName = fileInput.files[0].name;
    fileNameSpan.textContent = fileName; // Atualiza o span com o nome do arquivo
  } else {
    fileNameSpan.textContent = "Nenhum arquivo Selecionado"; // Mensagem padrão se nenhum arquivo for selecionado
  }
}
function EnviarDocumentoAdocao() {
  // Verifica se o usuário está logado (pode ser com uma flag no backend ou token JWT)
  const isLoggedIn = verificarLogin(); // Você precisa implementar essa função ou lógica

  if (isLoggedIn) {
    // Usuário está logado, pode continuar com a solicitação
    abrirModalEnvioDocumentos(); // Abre a modal para enviar os documentos
  } else {
    // Usuário não está logado, exibe uma mensagem ou redireciona para a página de login
    alert(
      "Você precisa estar logado para solicitar a adoção. Redirecionando para login."
    );
    window.location.href = "../View/login.html"; // Redireciona para a página de login
  }
}






function verificarLogin() {
  // Aqui você pode verificar se o usuário está logado, como checando um token ou sessão
  // Exemplo de verificação simples com token armazenado em localStorage (se você usar JWT):
  const token = localStorage.getItem("token");
  return token !== null; // Se houver token, está logado
}

function abrirModalEnvioDocumentos() {
  // Exibe a modal para o envio de documentos
  document.getElementById("modalEnvioDocumentos").style.display = "block";
}

function fecharModalEnvioDocumentos() {
  document.getElementById("modalEnvioDocumentos").style.display = "none";
}

// Função para abrir a modal de animais cadastrados
function abrirAnimaisModal() {
  const modal = document.getElementById("animaisModal");
  modal.style.display = "block";
 carregarAnimaisDoCliente();
}
// Função para fechar a modal de animais
function fecharAnimaisModal() {
  const modal = document.getElementById("animaisModal");
  modal.style.display = "none";
}

// // Função para carregar os animais cadastrados
// function carregarAnimais() {
//   // Aqui você deve fazer uma requisição para obter a lista de animais cadastrados
//   axios
//     .get("http://localhost:8081/api/cliente/ExibirAdocoesAnimais") // Supondo que essa é a rota para obter os animais
//     .then((response) => {
//       const animais = response.data;
//       const listaAnimaisDiv = document.getElementById("listaAnimais");
//       listaAnimaisDiv.innerHTML = ""; // Limpa a lista anterior

//       animais.forEach((animal) => {
//         const divAnimal = document.createElement("div");
//         divAnimal.classList.add("animal-item");
//         divAnimal.innerText = animal.nome; // Exibe o nome do animal
//         divAnimal.onclick = () => selecionarAnimal(animal); // Adiciona o evento de clique
//         listaAnimaisDiv.appendChild(divAnimal);
//       });
//     })
//     .catch((error) => {
//       console.error("Erro ao carregar os animais:", error);
//     });
// }
// Função para carregar os animais cadastrados
const idCliente = localStorage.getItem("idCliente");








function carregarAnimaisDoCliente() {
  // Requisição para obter a lista de animais cadastrados para o cliente
  axios
    .get(`http://localhost:8081/api/cliente/ListarAnimais/${idCliente}`) // Usando crases para interpolação
    .then((response) => {
      console.log(response);
      const animais = response.data;
      const listaAnimaisDiv = document.getElementById("listaAnimais");
      listaAnimaisDiv.innerHTML = ""; // Limpa a lista anterior

      animais.forEach((animal) => {
        console.log(animal);
        const divAnimal = document.createElement("div");
        divAnimal.classList.add("animal-card");

        // Foto do animal
        const fotoBase64 = animal.fotoAnimal
        ? `data:image/jpeg;base64,${animal.fotoAnimal}` // Converte a foto em base64 para exibir
        : "default-image.jpg"; // Usa uma imagem padrão caso não tenha foto
      
      const img = document.createElement("img");
      img.src = fotoBase64; // Define a fonte da imagem com base no valor processado
      img.alt = `Foto de ${animal.nome}`; // Texto alternativo com o nome do animal
      img.classList.add("animal-image");

        // Nome do animal
        const nome = document.createElement("p");
        nome.classList.add("animal-name");
        nome.innerText = animal.nome; // Exibe o nome do animal


        console.log(animal.adocao);
        const paraAdocaoTexto = document.createElement("p");
        if (animal.adocao) {
          paraAdocaoTexto.classList.add("adocao-warning");
          paraAdocaoTexto.innerText = "Animal já está para adoção";
          paraAdocaoTexto.style.cssText = `
            background-color: #ffeb3b;
            color: #000;
            font-size: 0.9em;
            padding: 5px;
            border-radius: 5px;
            text-align: center;
            margin-top: 10px;
            font-weight: bold;
          `;
          divAnimal.appendChild(paraAdocaoTexto); 
          // Adiciona o texto ao card
          divAnimal.onclick = () => naopodeselecionar(animal); // Adiciona o evento de clique

        }else{
         
          divAnimal.appendChild(paraAdocaoTexto);
          divAnimal.onclick = () => selecionarAnimal(animal); // Adiciona o evento de clique
        }

        // Adiciona o evento de clique no card
        // divAnimal.onclick = () => selecionarAnimal(animal); // Adiciona o evento de clique

        // Adiciona a foto e o nome ao card
        divAnimal.appendChild(img);
        divAnimal.appendChild(nome);

        // Adiciona o card ao container principal
        listaAnimaisDiv.appendChild(divAnimal);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar os animais:", error);
    });
}

function naopodeselecionar(animal){
  Swal.fire({
    title: "Animal já esta para doacao!",
    text: "animal nao pode ser selecionando ou cadastrado novamente!",
    icon: "warning"
  });

  

}












// Função para selecionar um animal e preencher o formulário
function selecionarAnimal(animal) {
  console.log("JJJJJJJJJJJJJJJJJJJJJJJJJJJ" + animal);
  // Preenche os campos do formulário com os dados do animal
  document.getElementById("nome").value = animal.nome;
  document.getElementById("descricao").value = animal.descricao;

  // Define a espécie e atualiza as raças
  document.getElementById("especie").value = animal.especie;
  atualizarRacas(); // Chama a função para atualizar as raças

  // Aguarde a atualização das raças antes de definir a raça
  setTimeout(() => {
    document.getElementById("raca2").value = animal.raca;
  }, 300); // Aguarda um curto período para garantir que as raças foram carregadas

  document.getElementById("sexo").value = animal.sexo;
  document.getElementById("idade2").value = animal.idade;
  document.getElementById("cor").value = animal.cor;
  document.getElementById("peso").value = animal.peso;

  // Lê a imagem do animal e exibe
  const fileInput = document.getElementById("fileInput");
  const previewImage = document.getElementById("previewImage");

  // Limpa o input e a imagem anterior
  fileInput.value = ""; // Limpa o campo de arquivo
  previewImage.style.display = "none"; // Esconde a imagem de prévia


  Swal.fire({
    title: "Selecione a foto do animal",
    html: `
    <div style="text-align: center; font-size: 1.1em; line-height: 1.5; margin-bottom: 15px;">
      <p style="text-align: justify; margin-bottom: 10px;">
        Para continuar, é necessário selecionar novamente a foto do animal. 
        Isso garante segurança e evita o envio de dados indevidos, pois os navegadores bloqueiam automaticamente 
        o carregamento de arquivos pré-selecionados. Por favor, envie a foto novamente.
      </p>
      <label for="fileAnimal"
       style="
        display: inline-block;
        padding: 10px 15px;
        background-color: #4cafac;
        color: white;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
      ">
        Escolher Foto
      </label>
      <input type="file" id="fileAnimal" class="swal2-file" style="display: none;">
    </div>
  `,
    showCancelButton: true,
    confirmButtonText: "Enviar",
    preConfirm: () => {
      const fileInput = Swal.getPopup().querySelector("#fileAnimal");
      if (!fileInput.files[0]) {
        Swal.showValidationMessage("Por favor, selecione uma imagem.");
        return false;
      }
      return fileInput.files[0];
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const file = result.value;
      enviarAnimalSelecionado(animal, file);
    }
  });
}










function enviarAnimalSelecionado(animal, fotoAnimal) {
  const animalJson = JSON.stringify(animal);
  const formData = new FormData();

  formData.append("animal", animalJson); // Adiciona o JSON do animal
  formData.append("fotoAnimal", fotoAnimal); // Adiciona a imagem selecionada
  
  Swal.fire({
    title: 'Cadastrando animal...',
    text: 'Por favor, aguarde enquanto o animal é cadastrado.',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });


  axios
    .post("http://localhost:8081/api/cliente/SelecaoAnimal/Adocao", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
       responseType: 'blob'
    })
    .then((response) => {
      Swal.close();
      if (response.status === 200) {
        Swal.fire("Sucesso!", "Comprovante enviado com sucesso!", "success");
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'comprovante_adocao.pdf';
        link.click();
        console.log("PDF gerado e pronto para download.");
      } else {
        console.error("Erro ao gerar o PDF:", response.statusText);
    }
    })
    .catch((error) => {
      console.error("Erro ao enviar os dados:", error);
      Swal.fire("Erro!", "Falha ao enviar os dados do animal.", "error");
    });
}


// Função para converter base64 em Blob
function dataURLtoBlob(dataURL) {
  const byteString = dataURL.split(",")[1]; // Obtém a parte base64
  const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0]; // Obtém o tipo MIME

  // Decodifica o base64
  const ab = new Uint8Array(
    atob(byteString)
      .split("")
      .map((c) => c.charCodeAt(0))
  );
  return new Blob([ab], { type: mimeString });
}


