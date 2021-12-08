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
            if (product.id === element.id) {
                console.log(product.nome)
                let list = document.getElementById('product-list');
                let productInfoDiv = document.createElement('div')
                productInfoDiv.classList = ["product-info"]
    
                addProductLine("", product.nome, productInfoDiv)

                let buttonElement = document.createElement('button')
                buttonElement.classList = ["atribute qtd btn-delete"]
                buttonElement.id = `${product.id}`
                buttonElement.innerHTML = "Delete"
                productInfoDiv.appendChild(buttonElement)
                
                let textElement = document.createElement('p')
                let textnode = document.createTextNode(`Qtd: ${element.qtd}`);
                textElement.classList = ["atribute qtd"]
                textElement.appendChild(textnode)
                productInfoDiv.appendChild(textElement)


                textElement = document.createElement('p')
                textnode = document.createTextNode(`${parseFloat(product.preco).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`);
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

function refreshProductQuantity(){
    let qtdProducts = document.getElementById('qtd-products');

    let carrinho = localStorage.getItem('carrinho');
    
    if(carrinho){
        carrinho = JSON.parse(carrinho);

        let totalProducts = 0;
        carrinho.forEach(element => {
          totalProducts += element.qtd;
        })

        qtdProducts.innerHTML = "";
        let textnode = document.createTextNode(`${totalProducts}`);
        qtdProducts.appendChild(textnode);
    }

}

function removeQtd(carrinho, products){
    let qtdProducts = document.getElementsByClassName('atribute qtd btn-delete');

    for (let element of qtdProducts) {
        console.log(element)
        element.addEventListener('click', function (e) {
            e.preventDefault();

            console.log(carrinho)
            carrinho = carrinho.filter(item => item.id !== element.id)
            console.log(carrinho)

            localStorage.setItem('carrinho', JSON.stringify(carrinho));

            element.parentElement.parentElement.remove();

            refreshProductQuantity();
        });
    }
}

function main(){
    let carrinho = localStorage.getItem("carrinho")

    if(carrinho) carrinho = JSON.parse(carrinho);
    else carrinho = []

    refreshProductQuantity();
    
    // Faz a requisição para a API buscando a listagem de categorias
    executeAPI("produto", "listar")
    .then((result) => {
        const products = result.dados;
        createProductVisual(products, carrinho);
        removeQtd(carrinho, products);
    })
    .catch((error) => console.log(error))

}

main()