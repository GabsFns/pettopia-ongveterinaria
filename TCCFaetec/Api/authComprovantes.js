function carregarComprovantes(idCliente) {
    
    // Recebe o ID do cliente como parâmetro
    console.log(`ID Cliente: ${idCliente}`);
    fetch(`http://localhost:8081/api/cliente/doacoes/${idCliente}`)
    
    
    // Chama o endpoint para buscar os comprovantes do cliente
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar os comprovantes");
        }
        return response.json();
      })
      .then((adocoes) => {
        console.log(adocoes);
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
          console.log(adocao.idPedido);
          const pedido = adocao.idPedido;
          const fotoBase64 = adocao.animal.fotoAnimal
            ? `data:image/jpeg;base64,${adocao.animal.fotoAnimal}`
            : "default-image.jpg";
          const card = document.createElement("div");
          card.className = "cardcomprovante";
  
          card.innerHTML = `
                      <img src="${fotoBase64}" alt="Foto do animal">
                <div id="DadosComprovante">     
      <h3>Comprovante: ${adocao.codigoComprovante}</h3>
      
      <p>Status: ${adocao.statusPedido}</p>
      <p>Data de Adoção: ${new Date(adocao.dataPedido).toLocaleDateString()}</p>
        <div id="BttComprovante">   
      <button onclick="baixarComprovanteCu('${
        pedido
      }')" class="botao-download">
        <i class="fas fa-download"></i>
      </button>
      
      <button onclick="visualizarComprovanteCu('${
        pedido
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

  function baixarComprovanteCu(pedido) {
    window.location.href = `http://localhost:8081/api/cliente/doacao/${pedido}/download`;
  }
  function visualizarComprovanteCu(pedido) {
    const url = `http://localhost:8081/api/cliente/doacao/${pedido}/view`;
    window.open(url, "_blank"); // Abre o PDF em uma nova aba
    
  }
  

  document.addEventListener("DOMContentLoaded", function () {
    const idCliente = localStorage.getItem("idCliente");
    carregarComprovantes(idCliente);
    carregarOpcoes();
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
    racaSelect.innerHTML = '<option value="">Selecionewww...</option>';
  
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
  

  