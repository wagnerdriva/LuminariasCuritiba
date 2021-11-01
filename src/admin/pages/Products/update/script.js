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

    console.log(idCode.value)

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


updateProducts();
