import { executeAPI } from "../../../backend.js";

function addCategoryLine(atributeName, atributeContent, div) {
  let textElement = document.createElement("p");
  let strongElement = document.createElement("span");
  let titlenode = document.createTextNode(`${atributeName}: `);
  let textnode = document.createTextNode(`${atributeContent}`);

  strongElement.classList = ["atribute-title"];
  textElement.classList = ["atribute"];

  strongElement.appendChild(titlenode);
  textElement.appendChild(strongElement);
  textElement.appendChild(textnode);
  div.appendChild(textElement);
}

function createCategoriesVisual(categories) {
  categories.map((category) => {
    let list = document.getElementById("category-list");
    let categoryInfoDiv = document.createElement("div");
    categoryInfoDiv.classList = ["category"];

    addCategoryLine("ID da Categoria", category.id, categoryInfoDiv);
    addCategoryLine("Nome", category.nome, categoryInfoDiv);

    list.appendChild(categoryInfoDiv);
  });
}

// Faz a requisição para a API buscando a listagem de categorias
executeAPI("categoria", "listar")
  .then((result) => {
    const categories = result.dados;
    createCategoriesVisual(categories);
  })
  .catch((error) => console.log(error));
