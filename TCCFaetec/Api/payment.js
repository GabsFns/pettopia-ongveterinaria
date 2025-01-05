function mascaraValor(input) {
    // Remove todos os caracteres que não são números, exceto a vírgula (para a entrada do valor monetário)
    let valor = input.value.replace(/\D/g, '');

    // Se o valor for vazio, retorna
    if (!valor) {
        input.value = '';
        return;
    }

    // Se o valor for menor que 10 centavos, coloca um zero à esquerda
    if (valor.length === 1) {
        valor = `0${valor}`; // Adiciona zero à esquerda
    }

    // Converte o valor para um formato monetário
    valor = (parseInt(valor, 10) / 100).toFixed(2) // Divide por 100 para corrigir a casa dos centavos
        .replace('.', ',')                         // Substitui ponto por vírgula
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');    // Adiciona ponto para separação de milhar

    // Atualiza o campo de entrada com o valor formatado
    input.value = `R$ ${valor}`;
}

// Função para criar o pagamento
async function criarPagamento(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Obtém o campo de entrada e limpa o valor (sem a formatação)
    const campoValor = document.getElementById("valor");
    let valorNumerico = campoValor.value.replace(/\D/g, ''); // Remove tudo, mantendo apenas números

    // Agora o valor deve ser tratado como número (com centavos)
    valorNumerico = (parseInt(valorNumerico, 10) / 100).toFixed(2); // Converte de volta para o formato monetário com duas casas decimais

    console.log("Valor numérico enviado:", valorNumerico);

    // Verifica se o cliente está logado e obtém o ID (caso exista no localStorage)
    const clienteId = localStorage.getItem("idCliente");

    Swal.fire({
        title: 'Aguarde...',
        text: 'Por favor, aguarde enquanto estamos estabelecendo a requisição.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try {
        // Faz a requisição ao backend com o valor numérico e o clienteId (se logado)
        const response = await fetch('http://localhost:8081/doacoes/criar-preferencia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                valor: valorNumerico, 
                clienteId: clienteId ? clienteId : undefined // Envia o clienteId se estiver logado
            })
        });

        const data = await response.json();

        Swal.close();

        console.log("Resposta do servidor:", data);

        if (data.preferenceId) {
            // Redireciona para o Mercado Pago para o pagamento
            const preferenceId = data.preferenceId;
            window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${preferenceId}`;
        } else {
            Swal.fire({
                title: "Erro",
                text: "Erro ao criar preferência de pagamento.",
                icon: "error"
            });
        }
    } catch (error) {
        console.error('Erro na requisição:', error);

        Swal.fire({
            title: "Erro",
            text: "Ocorreu um erro ao processar o pagamento.",
            icon: "error"
        });
    }
}

// Adiciona o evento ao formulário
document.getElementById("pagamentoForm").addEventListener("submit", criarPagamento);