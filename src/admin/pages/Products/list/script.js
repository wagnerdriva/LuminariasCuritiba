const request = localStorage.getItem("Products")
let allProducts = JSON.parse(request)

console.log(allProducts);

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


allProducts.map((product) => {
  let list = document.getElementById('product-list');
  let productInfoDiv = document.createElement('div')
  productInfoDiv.classList = ["product-info"]

  addProductLine("ID do Produto", product.id, productInfoDiv)
  addProductLine("Código", product.code, productInfoDiv)
  addProductLine("Categoria", product.category, productInfoDiv)
  addProductLine("Nome", product.name, productInfoDiv)
  addProductLine("Descrição", product.description, productInfoDiv)
  addProductLine("Preço", parseFloat(product.price).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}), productInfoDiv)
  addProductLine("Peso", product.weight, productInfoDiv)


  let productDiv = document.createElement('div')
  productDiv.classList = ["product"]


  let imageElement = document.createElement('img')
  imageElement.src = product.img

  productDiv.appendChild(productInfoDiv)
  productDiv.appendChild(imageElement)

  list.appendChild(productDiv);
});

