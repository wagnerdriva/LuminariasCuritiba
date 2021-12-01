import {executeAPI} from "../admin/backend.js";

async function addProductLine(atributeName, atributeContent, div) {
    let textElement = document.createElement('p')
    let textnode = document.createTextNode(`${atributeContent}`);

    textElement.classList = ["atribute"]

    textElement.appendChild(textnode)
    div.appendChild(textElement)
}

function createProductVisual(products, carrinho) {
    products.map((product) => {
        console.log(product)
        for(let element of carrinho){
            console.log(element)
            if (product.id === element.id) {
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
                imageElement.style.width = "75px";

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
            console.log("oi2")
            const products = result.dados;
            createProductVisual(products, carrinho);
        })
        .catch((error) => console.log(error))

    let checkoutInfo = localStorage.getItem("checkout")

    checkoutInfo = JSON.parse(checkoutInfo);
    document.getElementById('nome').innerHTML = "<strong>Nome: </strong>" + checkoutInfo.nome
    document.getElementById('cpf').innerHTML = "<strong>CPF:  </strong>" + checkoutInfo.cpf
    document.getElementById('cep').innerHTML = "<strong>CEP:  </strong>" + checkoutInfo.cep
    document.getElementById('rua').innerHTML = "<strong>Rua:  </strong>" + checkoutInfo.rua
    document.getElementById('numero').innerHTML = "<strong>Numero:  </strong>" + checkoutInfo.numero
    document.getElementById('complemento').innerHTML = "<strong>Complemento:  </strong>" + checkoutInfo.complemento
    document.getElementById('bairro').innerHTML = "<strong>Bairro:  </strong>" + checkoutInfo.bairro
    document.getElementById('cidade').innerHTML = "<strong>Cidade:  </strong>" + checkoutInfo.cidade
    document.getElementById('estado').innerHTML = "<strong>Estado:  </strong>" + checkoutInfo.estado
}

main()

document.getElementById("confirmar").addEventListener("click", () => {
    let checkoutInfo = localStorage.getItem("checkout")
    checkoutInfo = JSON.parse(checkoutInfo);
    let fields = `nome=${checkoutInfo.nome}&cpf=${checkoutInfo.cpf}&rua=${checkoutInfo.rua}&numero=${checkoutInfo.numero}&bairro=${checkoutInfo.bairro}&uf=${checkoutInfo.estado}&cep=${checkoutInfo.cep}&cidade=${checkoutInfo.cidade}`

    executeAPI("pedido", "inserir", fields)
        .then((result) => {
            localStorage.setItem("pedido", JSON.stringify(result.dados))
        })
        .catch((error) => console.log(error))
});