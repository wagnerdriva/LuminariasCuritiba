const request = localStorage.getItem("Categorys")
let allCategorys = JSON.parse(request)
console.log(allCategorys);

async function addCategoryLine(atributeName, atributeContent, div){
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

allCategorys.map((category) => {
  let list = document.getElementById('category-list');

  let categoryInfoDiv = document.createElement('div')
  categoryInfoDiv.classList = ["category"]

  addCategoryLine("ID da Categoria", category.id, categoryInfoDiv)
  addCategoryLine("Nome", category.name, categoryInfoDiv)
  
  list.appendChild(categoryInfoDiv);
});

