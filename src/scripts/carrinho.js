import { executeAPI } from "../admin/backend.js";

async function addProductLine(atributeName, atributeContent, div) {
    let textElement = document.createElement('p')
    let textnode = document.createTextNode(`${atributeContent}`);

    textElement.classList = ["atribute"]

    textElement.appendChild(textnode)
    div.appendChild(textElement)
}

function createProductVisual(products, carrinho) {
    products.map((product) => {
        for(let element of carrinho){
            if (product.imagem === element) {
                console.log(product.nome)
                let list = document.getElementById('product-list');
                let productInfoDiv = document.createElement('div')
                productInfoDiv.classList = ["product-info"]
    
                addProductLine("", product.nome, productInfoDiv)
                addProductLine("", parseFloat(product.preco).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }), productInfoDiv)
    
                let textElement = document.createElement('p')
                let textnode = document.createTextNode(`${1}`);
                textElement.classList = ["atribute qtd"]
                textElement.appendChild(textnode)
                productInfoDiv.appendChild(textElement)

                let productDiv = document.createElement('div')
                productDiv.classList = ["product"]
    
                let imageElement = document.createElement('img')
                imageElement.src = product.imagem
    
                productInfoDiv.appendChild(imageElement)
                productDiv.appendChild(productInfoDiv)
    
                list.appendChild(productDiv);
            }
        }
    });
}


function main(){
    let carrinho = localStorage.getItem("carrinho")

    if(carrinho) carrinho = JSON.parse(carrinho);
    else carrinho = []

    // Faz a requisição para a API buscando a listagem de categorias
    executeAPI("produto", "listar")
        .then((result) => {
            const products = result.dados;
            createProductVisual(products, carrinho);
        })
        .catch((error) => console.log(error))
}

main()