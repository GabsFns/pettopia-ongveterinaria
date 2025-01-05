document.addEventListener('DOMContentLoaded', function () {
    const cadastroForm = document.getElementById('cadastroForm');

    function formatDateForApi(dateStr) {
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month}-${day}`;
    }
    let hasError = false;

    // Seleciona os campos de email e senha
    const emailInputContainer = document.getElementById('email').closest('.input');
    const senhaInputContainer = document.getElementById('senha').closest('.input');
    const cpfInputContainer = document.getElementById('cpf').closest('.input');
    const nomeInputContainer = document.getElementById('nome').closest('.input');
    const telefoneInputContainer = document.getElementById('telefone').closest('.input');
    const datanascInputContainer = document.getElementById('datanasc').closest('.input');
    // Limpa os estilos de erro antes de nova verificação
    emailInputContainer.classList.remove('input-error');
    senhaInputContainer.classList.remove('input-error');
    cpfInputContainer.classList.remove('input-error');
    nomeInputContainer.classList.remove('input-error');
    telefoneInputContainer.classList.remove('input-error');
    datanascInputContainer.classList.remove('input-error');





    cadastroForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const telefone = document.getElementById('telefone').value;
        const data_nascimento = formatDateForApi(document.getElementById('datanasc').value);
        const email = document.getElementById('email').value;
        const password_Cliente = document.getElementById('senha').value;
        const generoCliente = document.querySelector('input[name="genero"]:checked')?.value;

        const elements = document.querySelectorAll('.input');


        document.querySelectorAll('.input').forEach(input => {
            input.classList.remove('input-error');
        });
    
        // Verifica campos obrigatórios e aplica borda vermelha se estiverem vazios
       
    


        if (!nome || !cpf || !telefone || !data_nascimento || !email || !password_Cliente || !generoCliente) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "warning",
                title: "Todos os Campos säo obrigatorios"
              });
            elements.forEach(element => {
                element.classList.add('input-error');
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:8081/api/cliente/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome, 
                    cpf, 
                    telefone, 
                    data_nascimento, 
                    email, 
                    password_Cliente,
                    generoCliente // Enviar o gênero como um valor de ENUM
                }),
            });
        
            if (response.ok) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                  });
                  Toast.fire({
                    icon: "success",
                    title: "Login Realizado com Sucesso"
                  });
                const data = await response.json();
        
                // Verifique o que a API realmente está retornando
                console.log("Resposta da API:", data);
        
                // Certifique-se de que o objeto retornado possui as propriedades esperadas
                
                    // Armazenar o token e o cliente no localStorage
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('idCliente', data.clienteModel
                        .idCliente);
                    localStorage.setItem('cliente', JSON.stringify(data.clienteModel));  // Salva o cliente no localStorage
                    setTimeout(() => {
                      location.href = "../../Client/Php/dashboard.php";
                      }, 3000);
                
                
            } else {
                const errorData = await response.json();
                console.log("Erro na resposta da API:", errorData);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                  });
                  Toast.fire({
                    icon: "warning",
                    title: errorData.message || "Erro desconhecido."
                  });
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    });
});