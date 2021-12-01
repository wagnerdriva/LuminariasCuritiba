import { executeAPI } from "../../../backend.js";

function removeOptions(select) {
  while (select.options.length > 0) select.remove(0);
}

function refreshOptions() {
  // Faz a requisição para a API buscando a listagem de categorias
  executeAPI("categoria", "listar")
    .then((result) => {
      const categories = result.dados;

      const select = document.getElementById("id-input");

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

function updateCategory(category) {
  executeAPI("categoria", "alterar", category)
    .then((result) => {
      console.log(result);
      let span = document.getElementById("message");

      if (result.status === "OK")
        span.innerHTML = "Categoria alterada com sucesso!";
      else span.innerHTML = "Erro ao alterar a categoria!";

      refreshOptions();
    })
    .catch((error) => {
      console.log(error);

      let span = document.getElementById("message");
      span.innerHTML = "Erro ao alterar a categoria!";
    });
}

refreshOptions();

const submit = document.getElementById("submit-form");
submit.addEventListener("click", function (e) {
  e.preventDefault();

  const id = document.getElementById("id-input").value;
  const nameElement = document.getElementById("name-input");

  updateCategory({ id, nome: nameElement.value });

  nameElement.value = "";
});
