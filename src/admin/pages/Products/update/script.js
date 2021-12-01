import { executeAPI } from "../../../backend.js";

function fillProductInfo(select) {
  executeAPI("produto", "listar")
    .then((result) => {
      const products = result.dados;
      let product = {};

      products.forEach((element) => {
        if (element.id.toString() === select.value) product = element;
      });

      const code = document.getElementById("code-input");
      code.value = product.codigo;
      const name = document.getElementById("name-input");
      name.value = product.nome;
      const description = document.getElementById("description-input");
      description.value = product.descricao;
      const price = document.getElementById("price-input");
      price.value = product.preco;
      const img = document.getElementById("img-input");
      img.value = product.imagem;
      const showImage = document.getElementById("show-image");
      showImage.src = product.imagem;

      const weight = document.getElementById("weight-input");
      weight.value = product.peso;

      const category = document.getElementById("category-input");
      category.value = product.categoria;
    })
    .catch((error) => console.log(error));
}

function removeOptions(select) {
  while (select.options.length > 0) select.remove(0);
}

function refreshOptions(selectID, type) {
  executeAPI(type, "listar")
    .then((result) => {
      const options = result.dados;

      const select = document.getElementById(selectID);

      removeOptions(select);

      options.forEach((element) => {
        let opt = document.createElement("option");
        opt.value = element.id;
        opt.innerHTML = element.nome;
        select.appendChild(opt);
      });

      if (type === "produto") {
        fillProductInfo(select, options);
      }
    })
    .catch((error) => console.log(error));
}

function updateProduct(product) {
  executeAPI("produto", "alterar", product)
    .then((result) => {
      console.log(result);
      let span = document.getElementById("message");

      if (result.status === "OK")
        span.innerHTML = "Produto atualizado com sucesso!";
      else span.innerHTML = "Erro ao atualizar o produto!";

      refreshOptions("idCode", "produto");
    })
    .catch((error) => {
      console.log(error);

      let span = document.getElementById("message");
      span.innerHTML = "Erro ao atualizar o produto!";
    });
}

refreshOptions("category-input", "categoria");
refreshOptions("idCode", "produto");

const select = document.getElementById("idCode");
select.addEventListener("click", function (e) {
  e.preventDefault();
  fillProductInfo(select);
});

const img = document.getElementById("img-input");
img.addEventListener("change", function (e) {
  e.preventDefault();

  const showImage = document.getElementById("show-image");
  showImage.src = img.value;
});

const submit = document.getElementById("submit-form");
submit.addEventListener("click", function (e) {
  e.preventDefault();

  let product = {
    id: document.getElementById("idCode").value,
    codigo: document.getElementById("code-input").value,
    categoria: document.getElementById("category-input").value,
    nome: document.getElementById("name-input").value,
    descricao: document.getElementById("description-input").value,
    preco: document.getElementById("price-input").value,
    imagem: document.getElementById("img-input").value,
    peso: document.getElementById("weight-input").value,
  };

  updateProduct(product);
});
