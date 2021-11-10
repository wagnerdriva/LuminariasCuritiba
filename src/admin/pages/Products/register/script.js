import { executeAPI } from "../../../backend.js";

function removeOptions(select) {
	while (select.options.length > 0) select.remove(0);     
}

function refreshOptions(){
	// Faz a requisição para a API buscando a listagem de categorias
	executeAPI("categoria", "listar")
	.then((result) => {
		const categories = result.dados;

		const select = document.getElementById('id-input');

		removeOptions(select);

		categories.forEach(element => {
			let opt = document.createElement('option');
			opt.value = element.id;
			opt.innerHTML = element.nome;
			select.appendChild(opt);
		})
	})    
	.catch((error) => console.log(error))
}

function saveNewProduct(product){
    executeAPI("produto", "inserir", product)
        .then(result => {
            console.log(result)
            let span = document.getElementById("message");

            if(result.status === "OK") span.innerHTML = "Produto criado com sucesso!"
            else span.innerHTML = "Erro ao criar o produto!"
        })
        .catch(error => {
            console.log(error)
            
            let span = document.getElementById("message");
            span.innerHTML = "Erro ao criar o produto!"
        })
}

refreshOptions();

const submit = document.getElementById("submit-form");

submit.addEventListener('click', function(e) {
    e.preventDefault();

    const product = {
        codigo: document.getElementById("code-input").value,
        categoria: document.getElementById("id-input").value,
        nome: document.getElementById("name-input").value,
        descricao: document.getElementById("description-input").value,
        preco: document.getElementById("price-input").value,
        imagem: document.getElementById("img-input").value,
        peso: document.getElementById("weight-input").value
    }

    saveNewProduct(product);
});

const img = document.getElementById("img-input");
img.addEventListener('change', function(e) {
    e.preventDefault();

    const showImage = document.getElementById("show-image");
    showImage.src = img.value;
})