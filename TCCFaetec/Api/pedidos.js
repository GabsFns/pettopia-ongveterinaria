document.addEventListener("DOMContentLoaded", function () {
    const idCliente = localStorage.getItem("idCliente"); // Obtém o ID do cliente armazenado
    console.log("ID Cliente:", idCliente); // Verificar se o idCliente está correto

    if (!idCliente) {
        console.error("ID do cliente não encontrado.");
        return;
    }

    fetch(`http://localhost:8081/api/cliente/ListarDocumentosCliente/${idCliente}`)
        .then(response => response.json())
        .then(documentos => {
            const container = document.getElementById("caixaprincipalPedidos");
            console.log("Documentos recebidos:", documentos); // Verifique os documentos recebidos

            if (!documentos || documentos.length === 0) {
                container.innerHTML = '<p>Você ainda não realizou nenhum pedido de adoção.</p>';
                return;
            }

            documentos.forEach(doc => {
                const arquivo = doc.arquivo;

                // Cria a estrutura de um pedido
                const contentPedidos = document.createElement("div");
                contentPedidos.className = "contentPedidos";
                contentPedidos.setAttribute("data-doc-id", doc.idDocumento); // Atribui um atributo para identificar o documento

                // Caixa Exemplo de Pedido (Dados)
                const caixaExemploPedidos = document.createElement("section");
                caixaExemploPedidos.id = "caixaExemploPedidos";

                const titulo = document.createElement("h2");
                titulo.textContent = `Documento ID: ${doc.idDocumento}`;

                const descricao = document.createElement("p");
                descricao.textContent = `Animal: ${doc.animal.nome || 'Desconhecido'}`;

                const data = document.createElement("p");
                data.textContent = new Date().toLocaleDateString(); // Insere a data atual, ajuste conforme necessário

                caixaExemploPedidos.appendChild(titulo);
                caixaExemploPedidos.appendChild(descricao);
                caixaExemploPedidos.appendChild(data);

                // Caixa de Status e Botão
                const caixaExemploPedidos2 = document.createElement("section");
                caixaExemploPedidos2.id = "caixaExemploPedidos2";

                const status = document.createElement("p");
                status.className = "StatusCliente"
                status.id = "statusPedidosExemplo";
                status.textContent = `Status: ${doc.status}`;

                if (doc.status === "CANCELADO") {
                    status.style.backgroundColor = "red";
                }

                if (doc.status === "CONCLUIDO") {
                    status.style.backgroundColor = "green";
                    status.style.color = "white";
                    const bttPdf = document.createElement("button");
                    bttPdf.onclick = function () { baixarComprovante(arquivo); };

                    const bttPdfVizu = document.createElement("button");
                    bttPdfVizu.onclick = function () { visualizarComprovante(arquivo); };
                    caixaExemploPedidos2.appendChild(bttPdf);
                    caixaExemploPedidos2.appendChild(bttPdfVizu);
                }

                if (doc.status === "YELLOW") {
                    status.style.backgroundColor = "yellow";
                }

                caixaExemploPedidos2.appendChild(status);

                // Adiciona as caixas ao contentPedidos
                contentPedidos.appendChild(caixaExemploPedidos);
                contentPedidos.appendChild(caixaExemploPedidos2);

                // Adiciona o pedido ao container principal
                container.appendChild(contentPedidos);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar documentos:", error);
        });
});

// Função para baixar o comprovante
function baixarComprovante(arquivo) {
    window.location.href = `http://localhost:8081/api/cliente/adocao/${arquivo}/download`;
}

// Função para visualizar o comprovante
function visualizarComprovante(arquivo) {
    const url = `http://localhost:8081/api/cliente/adocao/${arquivo}/view`;
    window.open(url, "_blank"); // Abre o PDF em uma nova aba
}