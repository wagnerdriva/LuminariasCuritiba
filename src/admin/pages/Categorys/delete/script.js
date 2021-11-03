const form = document.getElementById("update-form");


function removeCategory() {
  const submit = document.getElementById("submit-form");
  submit.addEventListener('click', function(e) {
    e.preventDefault();
    let categorys = [];
    const idName = document.getElementById("idName-input").value;

    if (localStorage.hasOwnProperty("Categorys")) {
      categorys = JSON.parse(localStorage.getItem("Categorys"))
    }

    let products = [];

    if (localStorage.hasOwnProperty("Products")) {
      products = JSON.parse(localStorage.getItem("Products"))
    }


    for(let i = 0; i < products.length; i += 1){
      if (products[i].category == idName) {
        console.log("Categoria em uso por produto.")
        const errorElement = document.getElementById("error-message");
        errorElement.innerHTML = "Categoria em uso por algum produto."
        return
      }
    }

    categorys.forEach((category) => {
      if (category.name == idName ||category.id == idName) {
        let index = categorys.indexOf(category);
        category = categorys.splice(index, 1);
      }
    });

    localStorage.setItem('Categorys', JSON.stringify(categorys));
  });
}

function getCategorys(){
  let allCategorys = [];

  if (localStorage.hasOwnProperty("Categorys")) {
    allCategorys = JSON.parse(localStorage.getItem("Categorys"))
  }

  const select = document.getElementById('idName-input');

  allCategorys.forEach(element => {
    let opt = document.createElement('option');
    opt.value = element.id;
    opt.innerHTML = element.name;
    select.appendChild(opt);
  })
}

getCategorys();
removeCategory();
