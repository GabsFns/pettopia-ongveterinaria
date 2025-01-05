document.addEventListener("DOMContentLoaded", function() {
    const form1 = document.getElementById("form1");
    const form2 = document.getElementById("form2");
    const bttCARTAO = document.getElementById("bttCARTAO");
    const bttQRCODE = document.getElementById("bttQRCODE");
    // Função para mostrar a seção de realizar denúncia
    bttQRCODE.addEventListener("click", function() {
        form1.style.display = "flex"; // Mostra a div de realizar denúncia
        form2.style.display = "none"; // Esconde a div de visualizar denúncia
    });

    // Função para mostrar a seção de visualizar denúncia
    bttCARTAO.addEventListener("click", function() {
        form2.style.display = "flex"; // Mostra a div de visualizar denúncia
        form1.style.display = "none"; // Esconde a div de realizar denúncia
    });
});

document.getElementById("Copiar").addEventListener("click", function(event) {
    // Obtém o texto do elemento com id "chavepix"
    event.preventDefault();
    const chavePix = document.getElementById("chavepix").textContent;
    
    // Copia o texto para a área de transferência
    navigator.clipboard.writeText(chavePix).then(() => {
      
      Swal.fire({
        icon: 'success',
        title: 'Chave Pix copiada!',
        html: `
          <p>Estamos esperando pela sua contribuição!</p>
         
        `,
        showConfirmButton: false,
        timer: 10000, // Duração de 8 segundos
        didOpen: () => {
          const progressBar = document.getElementById('progressBar');
          let timerInterval = setInterval(() => {
            const width = parseInt(getComputedStyle(progressBar).width);
            const newWidth = width - (width / 30); // Diminui a largura gradualmente
            progressBar.style.width = newWidth + 'px';
          }, 100);
        }
      });
    }).catch(err => {
      console.error("Erro ao copiar: ", err);
    });
  });