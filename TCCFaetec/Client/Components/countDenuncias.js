async function obterTotalDenuncias() {
    const idCliente = localStorage.getItem('idCliente'); // Obter o ID do cliente
    if (!idCliente) {
        console.error('ID do cliente não encontrado.');
        return;
    }
    
    try {
        const response = await fetch(`http://localhost:8081/api/cliente/totalDenuncias/${idCliente}`);
        if (response.ok) {
            const total = await response.json();
            console.log(total);
            document.querySelector('#CaixaDenuncia p').textContent = total; // Atualiza o contador
        } else {
            console.error('Erro ao obter o total de denúncias.');
        }
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
    }
}

// Chama a função para atualizar o total ao carregar a página
document.addEventListener('DOMContentLoaded', obterTotalDenuncias);

document.addEventListener('DOMContentLoaded', async () => {
    const idCliente = localStorage.getItem('idCliente'); // Pega o ID do cliente do localStorage

    try {
        // Faz a requisição para obter os dados
        const response = await fetch(`http://localhost:8081/api/cliente/denunciasTipoGrafico/${idCliente}`);
        const data = await response.json();
        console.log(data); // Verificar o que está sendo retornado

        // Labels esperados para o gráfico (tipos de denúncia)
        let labels = ['Violência', 'Perdido', 'Abandonado'];
        let counts = [0, 0, 0]; // Valores zerados padrão

        if (Array.isArray(data) && data.length > 0) {
            // Preenche os tipos de denúncia e contagens conforme os dados recebidos
            data.forEach(item => {
                const tipoDenuncia = item.tipoDenuncia.toUpperCase(); // Converte para maiúsculas para facilitar a comparação
                // Verifica o índice no array de labels, associando o enum ao label correto
                if (tipoDenuncia === 'VIOLENCIA') {
                    counts[0] = item.count;
                } else if (tipoDenuncia === 'PERDIDO') {
                    counts[1] = item.count;
                } else if (tipoDenuncia === 'ABANDONADO') {
                    counts[2] = item.count;
                }
            });
        }

        // Renderiza o gráfico
        const ctx = document.getElementById('graficoDenuncias').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Tipos de Denúncia',
                    data: counts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Ajuste para o tamanho personalizado
                scales: {
                    y: {
                        beginAtZero: true // Começa o eixo Y em zero
                    }
                }
            }
        });
    } catch (error) {
        console.error("Erro ao buscar os dados: ", error);
    }
});