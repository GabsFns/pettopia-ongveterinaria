document.getElementById('enviarDenuncia').addEventListener('click', async (e) => {
    e.preventDefault(); // Evita o recarregamento da página

    const descricao = document.getElementById('descricao').value;
    const tipoDenucias = document.getElementById('tipoDenuncia').value;
    console.log('Tipo de Denúncia:', tipoDenuncia)
    const cep = document.getElementById('cep').value;
    const logradouro = document.getElementById('logradouro').value;
    const uf = document.getElementById('uf').value;
    const bairro = document.getElementById('bairro').value;
    const complemento = document.getElementById('complemento').value;
    const localidade = document.getElementById("cidade").value;
    const numero = document.getElementById("numero").value

    const idCliente = localStorage.getItem('idCliente'); // Obter o ID do cliente

    console.log(document.getElementById("cidade").value);
    

    try {
        const response = await fetch('http://localhost:8081/api/cliente/RealizarDenuncia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                descricao,
                tipoDenucias,
                cliente: { idCliente },
                endereco: {
                    cep,
                    logradouro,
                    uf,
                    localidade,
                    bairro,
                    complemento,
                    numero

                }
            }),
        });

        
        if (response.ok) {
            Swal.fire({
                title: "Denuncia Realizada!",
                text: "Denuncia Realizada com Sucesso",
                icon: "success"
              });
            
            document.getElementById('form1Denuncia').reset();
            document.getElementById('form2Denuncia').reset();
            document.getElementById('form2Denuncia').style.display = 'none';
            document.getElementById('form1Denuncia').style.display = 'flex';
        } else {
            console.log(response);
            Swal.fire({
                title: "Error",
                text: "Error ao tentar realizar a denuncia",
                icon: "error"
              });
        }
    } catch (error) {
        console.error('Erro ao registrar denúncia:', error);
    }
});
