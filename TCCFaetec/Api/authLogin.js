document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Impede o envio padrão do formulário


   

    const email = document.getElementById('email').value;
    const password = document.getElementById('senha').value;
    // const dashboard = "http://localhost/TCCfaetec/Client/Php/dashboard.php";

    const elements = document.querySelectorAll('.input');

    let hasError = false;

    // Seleciona os campos de email e senha
    const emailInputContainer = document.getElementById('email').closest('.input');
    const senhaInputContainer = document.getElementById('senha').closest('.input');

    // Limpa os estilos de erro antes de nova verificação
    emailInputContainer.classList.remove('input-error');
    senhaInputContainer.classList.remove('input-error');

    const loginData = {
        email: email,
        password_Cliente: password
    };

    if (!email || !password) {
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
            title: "Preencha todos os Campos"
          });

          emailInputContainer.classList.add('input-error');
          hasError = true;
          senhaInputContainer.classList.add('input-error');
          hasError = true;
        elements.forEach(element => {
            element.classList.add('input-error');  // Adiciona a classe de erro aos elementos com a classe 'input'
        });
        return;
    }

    try {
        const response = await fetch('http://localhost:8081/api/LoginWeb/loginWeb', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
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
            const data = await response.json();  // Obtenha a resposta como JSON diretamente
            console.log('Dados recebidos do servidor:', data);

            if (data.token && data.cliente) {
                // Redireciona apenas se ambos os dados estiverem presentes
                const token = data.token;
                localStorage.setItem('idCliente', data.cliente.idCliente);
                localStorage.setItem('token', token);
                localStorage.setItem('cliente', JSON.stringify(data.cliente));
             
                  setTimeout(() => {
                    location.href = "../../Client/Php/dashboard.php";
                  }, 3000);

            } else {
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
                    icon: "error",
                    title: "Erro na requisição"
                  });
                  emailInputContainer.classList.add('input-error');
          hasError = true;
          senhaInputContainer.classList.add('input-error');
          hasError = true;
                console.error('Dados recebidos:', data);
            }
        } else {
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
                icon: "error",
                title: "Credenciais inválidas"
              });
              emailInputContainer.classList.add('input-error');
          hasError = true;
          senhaInputContainer.classList.add('input-error');
          hasError = true;
            const errorMessage = await response.text();
            document.getElementById('errorMessage').style.display = 'block';
            elements.forEach(element => {
                element.classList.add('input-error');  // Adiciona a classe de erro aos elementos com a classe 'input'
            });
            document.getElementById('errorMessage').innerText = errorMessage;
        }
    } catch (error) {
        console.error('Erro ao tentar fazer login:', error);
        document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('errorMessage').innerText = 'Erro ao conectar com o servidor.';
    }
});

const eyeIcon = document.getElementById('eyeIcon');


document.getElementById('togglePassword').addEventListener('mousedown', function () {
    const senhaInput = document.getElementById('senha');
    senhaInput.type = 'text';
    eyeIcon.src = "../Ui/Images/view.png"; 
});

document.getElementById('togglePassword').addEventListener('mouseup', function () {
    const senhaInput = document.getElementById('senha');
    senhaInput.type = 'password';
    eyeIcon.src = "../Ui/Images/hide.png"; 
});

// Para garantir que a senha volte a ser oculta caso o usuário arraste o mouse para fora do botão
document.getElementById('togglePassword').addEventListener('mouseout', function () {
    const senhaInput = document.getElementById('senha');
    senhaInput.type = 'password';
    eyeIcon.src = "../Ui/Images/hide.png"; 
});