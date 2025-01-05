async function getDoacoes(idCliente) {
    const response = await fetch(`http://localhost:8081/api/cliente/graficoDoacao/${idCliente}`);
    const doacoes = await response.json();
    console.log("exemplo", doacoes);
    console.log("id", idCliente)
    return doacoes;
}
async function renderizarGrafico(idCliente) {
    const doacoes = await getDoacoes(idCliente);
    console.log('Doações:', doacoes); // Para depuração
    
    // Agrupar as doações por mês/ano
    const doacoesPorMes = {};

    doacoes.forEach(doacao => {
        const data = new Date(doacao.dataDoacao); // Converte a data para o formato Date
        const mesAno = `${data.getMonth() + 1}/${data.getFullYear()}`; // Mês/Ano (0-based para mês, por isso +1)
        
        // Inicializa o total de doações para esse mês/ano, se não existir
        if (!doacoesPorMes[mesAno]) {
            doacoesPorMes[mesAno] = 0;
        }

        // Soma o valor das doações para o mês/ano
        doacoesPorMes[mesAno] += doacao.valor;
    });

    console.log("Doações por mês:", doacoesPorMes);

    // Preparar os dados para o gráfico
    const labels = Object.keys(doacoesPorMes); // Meses/Ano
    const valores = Object.values(doacoesPorMes); // Totais das doações por mês

    console.log("Valores das doações:", valores);

    const ctx = document.getElementById('meuGrafico').getContext('2d');
    const grafico = new Chart(ctx, {
        type: 'line', // Tipo do gráfico: 'line' para gráfico de linhas
        data: {
            labels: labels, // Mês/Ano como labels
            datasets: [{
                label: 'Total de Doações (em R$)',
                data: valores, // Total das doações por mês
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false // Não preenche a área abaixo da linha
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true // Começa o eixo Y em zero
                }
            }
        }
    });
}

// Ao carregar a página, chama a função de renderização
document.addEventListener('DOMContentLoaded', () => {
    const idCliente = localStorage.getItem("idCliente"); // Obtém o idCliente do localStorage
    if (idCliente) { // Verifica se idCliente é válido
        renderizarGrafico(idCliente);
    } else {
        console.error('ID do Cliente não encontrado no localStorage');
    }
});