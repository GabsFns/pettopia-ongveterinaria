document.addEventListener("DOMContentLoaded", function() {
    // Função para animar os números
    function animateCounter(element, finalValue, addPlus = false) {
      let startValue = 0;
      let duration = 2000; // Duração da animação em ms
      let stepTime = Math.abs(Math.floor(duration / finalValue));
      
      let interval = setInterval(function() {
        startValue += 1;
        element.textContent = startValue;
        if (startValue >= finalValue) {
          clearInterval(interval);
          // Adiciona o sinal de mais se necessário
          if (addPlus) {
            element.textContent = `${finalValue}+`; // Adiciona o sinal de mais após a animação
          } else {
            element.textContent = `${finalValue}`; // Apenas o número sem sinal de mais
          }
        }
      }, stepTime);
    }
  
    // Função para verificar se a seção está visível na tela
    function checkVisibility() {
      const counters = document.querySelectorAll('.counter');
      counters.forEach(counter => {
        // Verifica se a seção não foi animada antes
        if (counter.classList.contains('animated')) return;
  
        const rect = counter.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          counter.classList.add('visible');  // Torna a seção visível
          const numberElement = counter.querySelector('.counter-number');
          let finalValue;
          let addPlus = false; // Variável para decidir se adiciona o sinal de mais
  
          // Defina os valores finais de acordo com cada contador e se deve adicionar o sinal de mais
          switch(counter.id) {
            case "animais":
              finalValue = 900;
              addPlus = true; // Adiciona o sinal de mais para Animais
              break;
            case "resgates":
              finalValue = 2270;
              addPlus = true; // Adiciona o sinal de mais para Resgates
              break;
            case "unidades":
              finalValue = 5;
              addPlus = false; // Não adiciona sinal de mais para Unidades
              break;
            default:
              finalValue = 0;
              addPlus = false;
          }
  
          // Anima o número com a condição do sinal de mais
          animateCounter(numberElement, finalValue, addPlus);
  
          // Marca a seção como animada
          counter.classList.add('animated');
        }
      });
    }
  
    // Chama a função ao rolar a página
    window.addEventListener("scroll", checkVisibility);
  });