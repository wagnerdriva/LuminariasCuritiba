import { executeAPI } from "../../../backend.js";

function saveNewCategory(category) {
  executeAPI("categoria", "inserir", category)
    .then((result) => {
      console.log(result);
      let span = document.getElementById("message");

      if (result.status === "OK")
        span.innerHTML = "Categoria criada com sucesso!";
      else span.innerHTML = "Erro ao criar a categoria!";
    })
    .catch((error) => {
      console.log(error);

      let span = document.getElementById("message");
      span.innerHTML = "Erro ao criar a categoria!";
    });
}

const submit = document.getElementById("submit-form");
submit.addEventListener("click", function (e) {
  e.preventDefault();

  const name = document.getElementById("name-input");
  saveNewCategory({ nome: name.value });
});
