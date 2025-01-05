document.getElementById('continuarBtn').addEventListener('click', function(event) {
    event.preventDefault(); 

    var valido = true
    const cep = document.getElementById("cep").value.trim();
    const logradouro = document.getElementById("logradouro").value.trim();
    const bairro = document.getElementById("bairro").value.trim();
    const uf = document.getElementById("uf").value.trim();
    
    if(!cep || !logradouro || !bairro || !uf){
        valido = false;
        alert("Preencha todos os campos")
       return
    }
        document.getElementById('form1Denuncia').style.display = 'none';
        document.getElementById('form2Denuncia').style.display = 'flex'; 
});

document.getElementById('voltarBtn').addEventListener('click', function(event) {
    event.preventDefault(); 
    document.getElementById('form1Denuncia').style.display = 'flex';
    document.getElementById('form2Denuncia').style.display = 'none';
});