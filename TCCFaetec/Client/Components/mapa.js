document.addEventListener('DOMContentLoaded', function() {
    showMap(1); // Exibe o mapa da primeira unidade ao carregar a página
  });
  
  function showMap(mapNumber) {
    // Esconde todos os mapas
    var maps = document.querySelectorAll('.mapa');
    maps.forEach(function(map) {
      if (map.classList.contains('active')) {
        map.classList.remove('active'); // Remove a classe 'active' para ocultar o mapa atual
        // Aguarda um breve momento para garantir que a animação de saída seja visível
        setTimeout(function() {
          map.style.display = 'none'; // Define como 'none' após a transição de saída
        }, 500); // Tempo deve corresponder ao tempo da transição no CSS
      }
    });
  
    // Exibe o mapa selecionado
    var selectedMap = document.getElementById('map' + mapNumber);
    selectedMap.style.display = 'block'; // Garante que o mapa seja exibido
    setTimeout(function() {
      selectedMap.classList.add('active'); // Adiciona a classe 'active' ao mapa selecionado
    }, 500); // Pequeno atraso para garantir que o display seja aplicado antes da animação de fade-in
  }