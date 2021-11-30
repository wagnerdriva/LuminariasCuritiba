function buildCEPRequest(cep){
    let cleaned_cep = cep.replace('-', '')
    return `https://viacep.com.br/ws/${cleaned_cep}/json`;
}


function personalInfo() {
    if (document.getElementById('cpf').checkValidity() && document.getElementById('nome').checkValidity() && document.getElementById('cep').checkValidity()){
        getCEP()
      } 
}

async function getCEP (url) {
        let cep = document.getElementById('cep').value
        let response = await fetch(buildCEPRequest(cep));
        let data = await response.json();
        console.log(data)
        return data;
}



//   {
//     "cep": "80210-000",
//     "logradouro": "Avenida Prefeito Omar Sabbag",
//     "complemento": "",
//     "bairro": "Jardim Botânico",
//     "localidade": "Curitiba",
//     "uf": "PR",
//     "ibge": "4106902",
//     "gia": "",
//     "ddd": "41",
//     "siafi": "7535"
//   }

// document.getElementById('pessoal').addEventListener('click', function() {
//     if (document.getElementById('cpf').checkValidity() && document.getElementById('nome').checkValidity()) {
//       window.alert('valid station name');
//       // addMessage();
//     } else {
//       window.alert('invalid station name!');
//     }
//   });