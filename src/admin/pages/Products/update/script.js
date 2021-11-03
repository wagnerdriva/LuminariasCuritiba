const form = document.getElementById("update-form");


function updateProducts() {
  const submit = document.getElementById("submit-form");
  submit.addEventListener('click', function(e) {
    e.preventDefault();
    let products = [];

    const idCode = document.getElementById("idCode");

    const code = document.getElementById("code-input");
    const category = document.getElementById("category-input");
    const name = document.getElementById("name-input");
    const description = document.getElementById("description-input");
    const price = document.getElementById("price-input");
    const img = document.getElementById("img-input");
    const weight = document.getElementById("weight-input");

    if (localStorage.hasOwnProperty("Products")) {
      products = JSON.parse(localStorage.getItem("Products"))
    }

    products.map((product) => {
      if (product.id == idCode.value || product.code == idCode.value) {
        console.log("entrou:" + product)
        if (code.value) {
          product.code = code.value;
        }
        if (category.value) {
          product.category = category.value;
        }
        if (name.value) {
          product.name = name.value;
        }
        if (description.value) {
          product.description = description.value;
        }
        if (price.value) {
          product.price = price.value;
        }
        if (img.value) {
          product.img = img.value;
        }
        if (weight.value) {
          product.weight = weight.value;
        }
      }
    });

    localStorage.setItem('Products', JSON.stringify(products));
  });
}

function fillProductInfo(select, allProducts){
  let product = {};
  allProducts.forEach(element => {
    if(element.id.toString() === select.value){
      product = element
    }
  })

  const code = document.getElementById("code-input");
  code.value = product.code;
  const name = document.getElementById("name-input");
  name.value = product.name;
  const description = document.getElementById("description-input");
  description.value = product.description;
  const price = document.getElementById("price-input");
  price.value = product.price;
  const img = document.getElementById("img-input");
  img.value = product.img;
  const showImage = document.getElementById("show-image");
  showImage.src = product.img;

  const weight = document.getElementById("weight-input");
  weight.value = product.weight;

  const category = document.getElementById("category-input");
  category.value = product.category
}

function getCategorys(){
  let allCategorys = [];

  if (localStorage.hasOwnProperty("Categorys")) {
    allCategorys = JSON.parse(localStorage.getItem("Categorys"))
  }

  const select = document.getElementById('category-input');

  allCategorys.forEach(element => {
    let opt = document.createElement('option');
    opt.value = element.id;
    opt.innerHTML = element.name;
    select.appendChild(opt);
  })
}

function getProducts(){
  let allProducts = [];

  if (localStorage.hasOwnProperty("Products")) {
    allProducts = JSON.parse(localStorage.getItem("Products"))
  }

  const select = document.getElementById('idCode');

  allProducts.forEach(element => {
    let opt = document.createElement('option');
    opt.value = element.id;
    opt.innerHTML = element.name;
    select.appendChild(opt);
  })

  fillProductInfo(select, allProducts)

  select.addEventListener('click', function(e) {
    e.preventDefault();

    fillProductInfo(select, allProducts)
  })

  const img = document.getElementById("img-input");
  
  img.addEventListener('change', function(e) {
    e.preventDefault();
    
    const showImage = document.getElementById("show-image");
    showImage.src = img.value;
  })

}

getCategorys();
getProducts();
updateProducts();
