import { executeAPI } from "../admin/backend.js";

export function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function addCategoryLine(id, atributeContent, div) {
    let textElement = document.createElement('p')
    let textnode = document.createTextNode(`${atributeContent}`);

    textElement.id = id
    textElement.classList = ["atribute-title"]

    textElement.appendChild(textnode)
    div.appendChild(textElement)
}

function createCategoriesVisual(categories) {
    categories.map((category) => {
        let list = document.getElementById('category-list');
        let categoryInfoDiv = document.createElement('div')
        categoryInfoDiv.classList = ["category"]

        addCategoryLine(category.id, category.nome, categoryInfoDiv)

        list.appendChild(categoryInfoDiv);
    });
}

function listProducts(categoryID, allProducts = false) {
    async function addProductLine(atributeName, atributeContent, div) {
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

    function createProductVisual(products) {
        products.map((product) => {
            if (product.categoria === categoryID || allProducts) {
                let list = document.getElementById('product-list');
                let productInfoDiv = document.createElement('div')
                productInfoDiv.classList = ["product-info"]

                addProductLine("Nome", product.nome, productInfoDiv);
                addProductLine("Descrição", product.descricao, productInfoDiv);
                addProductLine("Preço", parseFloat(product.preco).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }), productInfoDiv);
                addProductLine("Peso (Kg)", product.peso, productInfoDiv);


                let productDiv = document.createElement('div');
                productDiv.classList = ["product"];
                productDiv.id = product.id;
                productDiv.draggable = true;
                productDiv.ondragstart = drag;


                let imageElement = document.createElement('img')
                imageElement.src = product.imagem
                imageElement.draggable = false;

                productDiv.appendChild(productInfoDiv)
                productDiv.appendChild(imageElement)

                list.appendChild(productDiv);
            }
        });
    }


    // Faz a requisição para a API buscando a listagem de categorias
    executeAPI("produto", "listar")
        .then((result) => {
            const products = result.dados;
            createProductVisual(products);
        })
        .catch((error) => console.log(error))
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

function main() {
    listProducts('', true);

    refreshProductQuantity();

    // Faz a requisição para a API buscando a listagem de categorias
    executeAPI("categoria", "listar")
        .then((result) => {
            const categories = result.dados;
            createCategoriesVisual(categories);

            const categoriesElements = document.getElementsByClassName("atribute-title");

            for (let element of categoriesElements) {
                element.addEventListener('click', function (e) {
                    e.preventDefault();

                    let list = document.getElementById('product-list');
                    list.innerHTML = "";

                    if(element.id === '000') listProducts('', true)
                    else listProducts(element.id);
                });
            }
        })
        .catch((error) => console.log(error))
}

main()