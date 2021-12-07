import { executeAPI } from "../../../backend.js";

function removeOptions(select) {
  while (select.options.length > 0) select.remove(0);
}

function refreshOptions() {
  // Faz a requisição para a API buscando a listagem de categorias
  executeAPI("categoria", "listar")
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

async function getProducts() {
  try {
    const request = await executeAPI("produto", "listar");
    return request.dados;
  } catch (error) {
    return [];
  }
}

async function isCategoryInUse(categoryID) {
  const products = await getProducts();

  for (let i = 0; i < products.length; i += 1)
    if (products[i].categoria === categoryID) return true;

  return false;
}

function removeCategory(id) {
  executeAPI("categoria", "remover", { id })
    .then((result) => {
      console.log(result);
      let span = document.getElementById("message");

      if (result.status === "OK")
        span.innerHTML = "Categoria removida com sucesso!";
      else span.innerHTML = "Erro ao remover a categoria!";

      refreshOptions();
    })
    .catch((error) => {
      console.log(error);

      let span = document.getElementById("message");
      span.innerHTML = "Erro ao remov er a categoria!";
    });
}

refreshOptions();

const submit = document.getElementById("submit-form");
submit.addEventListener("click", async function (e) {
  e.preventDefault();

  const id = document.getElementById("idName-input").value;

  if (!(await isCategoryInUse(id))) removeCategory(id);
  else {
    let span = document.getElementById("message");
    span.innerHTML = "Erro ao remover a categoria! Ela esta sendo utilizada.";
  }
});

// function removeCategory() {
//   const submit = document.getElementById("submit-form");
//   submit.addEventListener('click', function(e) {
//     e.preventDefault();
//     let categorys = [];
//     const idName = document.getElementById("idName-input").value;

//     if (localStorage.hasOwnProperty("Categorys")) {
//       categorys = JSON.parse(localStorage.getItem("Categorys"))
//     }

//     let products = [];

//     if (localStorage.hasOwnProperty("Products")) {
//       products = JSON.parse(localStorage.getItem("Products"))
//     }

//     for(let i = 0; i < products.length; i += 1){
//       if (products[i].category == idName) {
//         const errorElement = document.getElementById("error-message");
//         errorElement.innerHTML = "Categoria em uso por algum produto."
//         return
//       }
//     }

//     categorys.forEach((category) => {
//       if (category.name == idName ||category.id == idName) {
//         let index = categorys.indexOf(category);
//         category = categorys.splice(index, 1);
//       }
//     });

//     localStorage.setItem('Categorys', JSON.stringify(categorys));
//   });
// }
