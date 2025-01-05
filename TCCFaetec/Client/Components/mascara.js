 // Função para formatar CPF
 function formatCpf(value) {
    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4'); // Aplica a máscara
    return value;
  }

  // Função para formatar Telefone
  function formatTelefone(value) {
    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3'); // Aplica a máscara
    return value;
  }

  // Função para formatar Data de Nascimento
  function formatDataNascimento(value) {
    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    value = value.replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3'); // Aplica a máscara
    return value;
  }

  // Adiciona o evento de input para aplicar as máscaras
  document.getElementById('cpf').addEventListener('input', function (e) {
    e.target.value = formatCpf(e.target.value);
  });

  document.getElementById('telefone').addEventListener('input', function (e) {
    e.target.value = formatTelefone(e.target.value);
  });

  document.getElementById('datanasc').addEventListener('input', function (e) {
    e.target.value = formatDataNascimento(e.target.value);
  });
  