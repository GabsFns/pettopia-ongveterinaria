document.getElementById('cep').addEventListener('input', function (e) {
  let cep = e.target.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico

  if (cep.length === 8) { // Verifica se o CEP está completo
    let url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`); // Lança erro se a resposta não for OK (200)
        }
        return response.json();
      })
      .then(data => {
        if (data.erro) {
          Swal.fire({
            title: "CEP NÃO ENCONTRADO",
            text: "Esse Cep não existe",
            icon: "question"
          });
        } else {
          document.getElementById('logradouro').value = data.logradouro;
          document.getElementById('bairro').value = data.bairro;
          document.getElementById('uf').value = data.uf;
          document.getElementById('cidade').value = data.localidade; // Adiciona o nome da cidade
        }
      })
      .catch(error => {
        console.error("Erro ao buscar o CEP:", error);
        alert("Erro ao buscar o CEP. Tente novamente mais tarde.");
      });
  }

  // Aplica a máscara no formato 99999-999
  cep = cep.slice(0, 8); // Limita o CEP a 8 dígitos
  e.target.value = cep.length > 5 ? `${cep.slice(0, 5)}-${cep.slice(5, 8)}` : cep;
});

document.getElementById('BuscarCEP').addEventListener('click', function (event) {
  event.preventDefault(); // Evita o recarregamento da página ao clicar no botão
  
  let cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove caracteres não numéricos

  if (cep.length !== 8) {
    alert("Por favor, insira um CEP válido!");
    return;
  }

  let url = `https://viacep.com.br/ws/${cep}/json/`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`); // Lança erro se a resposta não for OK (200)
      }
      return response.json();
    })
    .then(data => {
      if (data.erro) {
        Swal.fire({
          title: "CEP NÃO ENCONTRADO",
          text: "Esse Cep não existe",
          icon: "question"
        });
      } else {
        document.getElementById('logradouro').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('uf').value = data.uf;
        document.getElementById('cidade').value = data.localidade; // Adiciona o nome da cidade
      }
    })
    .catch(error => {
      console.error("Erro ao buscar o CEP:", error);
      alert("Erro ao buscar o CEP. Tente novamente mais tarde.");
    });
});