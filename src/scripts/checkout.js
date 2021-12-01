function buildCEPRequest(cep) {
  let cleaned_cep = cep.replace("-", "");
  return `https://viacep.com.br/ws/${cleaned_cep}/json`;
}

async function personalInfo() {
  if (
    document.getElementById("cpf").checkValidity() &&
    document.getElementById("nome").checkValidity() &&
    document.getElementById("cep").checkValidity()
  ) {
    let cepInfo = await getCEP();
    if (!cepInfo.erro) {
      document.getElementById("rua").value = cepInfo.logradouro;
      document.getElementById("bairro").value = cepInfo.bairro;
      document.getElementById("cidade").value = cepInfo.localidade;
      document.getElementById("estado").value = cepInfo.uf;
      document.getElementById("cepdiv").removeAttribute("hidden");
      document.getElementById("nome").setAttribute("readonly", true);
      document.getElementById("cpf").setAttribute("readonly", true);
      document.getElementById("cep").setAttribute("readonly", true);
      document.getElementById("enviar1").setAttribute("hidden", true);
    } else {
      alert("CEP não encontrado");
    }
  }
}

async function getCEP(url) {
  let cep = document.getElementById("cep").value;
  let response = await fetch(buildCEPRequest(cep));
  let data = await response.json();
  console.log(data);
  return data;
}

function finalizarCheckout() {
  if (document.getElementById("numero").checkValidity()) {
    checkout = {
      nome: document.getElementById("nome").value,
      cpf: document.getElementById("cpf").value,
      cep: document.getElementById("cep").value,
      rua: document.getElementById("rua").value,
      numero: document.getElementById("numero").value,
      complemento: document.getElementById("complemento").value,
      bairro: document.getElementById("bairro").value,
      cidade: document.getElementById("cidade").value,
      estado: document.getElementById("estado").value,
    };

    localStorage.setItem("checkout", JSON.stringify(checkout));
  } else {
    alert("Entre com o numero da sua residencia");
  }
}
