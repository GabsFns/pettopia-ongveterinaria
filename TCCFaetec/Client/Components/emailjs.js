emailjs.init("pnedYG2nm0l8SRjWq");  // Substitua "YOUR_USER_ID" pelo seu ID do EmailJS

// Captura o evento de envio do formulário
document.getElementById("feedback-form").addEventListener("submit", function(event) {
  event.preventDefault();  // Impede o envio padrão do formulário

  // Coleta os dados do formulário
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  Swal.fire({
    title: 'Enviando Feedback...',
    text: 'Por favor, aguarde!',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  // Envia os dados do formulário para o template do EmailJS
  emailjs.sendForm("service_96pk8zi", "template_vcbm0eu", this)
    .then(function(response) {
        Swal.close();
      console.log("Sucesso:", response);
      Swal.fire({
        title: "Muito obrigado pelo o FeedBack!",
        text: "Feedback enviado com sucesso!",
        icon: "success"
      });
    }, function(error) {
      console.log("Erro:", error);
      alert("Falha ao enviar feedback. Tente novamente.");
    });
});