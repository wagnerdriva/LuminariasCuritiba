import { executeAPI } from "../../../backend.js";


async function addProductLine(atributeName, atributeContent, div){
  let textElement = document.createElement('p')
  let strongElement = document.createElement('span')
  let titlenode = document.createTextNode(`${atributeName}: `); 
  let textnode = document.createTextNode(`${atributeContent}`);  

  strongElement.classList = ["atribute-title"]
  textElement.classList = ["atribute"]

  strongElement.appendChild(titlenode)
  textElement.appendChild(strongElement)
  textElement.appendChild(textnode)
  div.appendChild(textElement)
} 

function createProductVisual(products){
    products.map((product) => {
        let list = document.getElementById('product-list');
        let productInfoDiv = document.createElement('div')
        productInfoDiv.classList = ["product-info"]
    
        addProductLine("ID do Produto", product.id, productInfoDiv)
        addProductLine("Código", product.codigo, productInfoDiv)
        addProductLine("Categoria", product.categoria, productInfoDiv)
        addProductLine("Nome", product.nome, productInfoDiv)
        addProductLine("Descrição", product.descricao, productInfoDiv)
        addProductLine("Preço", parseFloat(product.preco).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}), productInfoDiv)
        addProductLine("Peso (Kg)", product.peso, productInfoDiv)
    
    
        let productDiv = document.createElement('div')
        productDiv.classList = ["product"]
    
    
        let imageElement = document.createElement('img')
        imageElement.src = product.imagem
    
        productDiv.appendChild(productInfoDiv)
        productDiv.appendChild(imageElement)
    
        list.appendChild(productDiv);
    });    
}


// Faz a requisição para a API buscando a listagem de categorias
executeAPI("produto", "listar")
    .then((result) => {
        const products = result.dados;
        createProductVisual(products);
    })    
    .catch((error) => console.log(error))