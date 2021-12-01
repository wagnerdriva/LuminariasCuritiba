import { executeAPI } from "../../../backend.js";

function removeOptions(select) {
  while (select.options.length > 0) select.remove(0);
}

function refreshOptions() {
  // Faz a requisição para a API buscando a listagem de categorias
  executeAPI("produto", "listar")
    .then((result) => {
      const categories = result.dados;

      const select = document.getElementById("idName-input");

      removeOptions(select);

      categories.forEach((element) => {
        let opt = document.createElement("option");
        opt.value = element.id;
        opt.innerHTML = element.nome;
        select.appendChild(opt);
      });
    })
    .catch((error) => console.log(error));
}

function removeProduct(id) {
  executeAPI("produto", "remover", { id })
    .then((result) => {
      console.log(result);
      let span = document.getElementById("message");

      if (result.status === "OK")
        span.innerHTML = "Produto removido com sucesso!";
      else span.innerHTML = "Erro ao remover o produto!";

      refreshOptions();
    })
    .catch((error) => {
      console.log(error);

      let span = document.getElementById("message");
      span.innerHTML = "Erro ao remover o produto!";
    });
}

refreshOptions();

const submit = document.getElementById("submit-form");
submit.addEventListener("click", function (e) {
  e.preventDefault();

  const id = document.getElementById("idName-input").value;
  removeProduct(id);
});
