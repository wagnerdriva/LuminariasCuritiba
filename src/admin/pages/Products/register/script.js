const form = document.getElementById("register-form");

class Product {
  constructor(code, category, name, description, price, img, weight){
    this.id = 0;
    this.code = code;
    this.category = category;
    this.name = name;
    this.description = description;
    this.price = price;
    this.img = img;
    this.weight = weight;
  }
}


function registerProducts() {
  const submit = document.getElementById("submit-form");
  submit.addEventListener('click', function(e) {
    e.preventDefault();

    let products = [];
    const code = document.getElementById("code-input");
    const category = document.getElementById("category-input");
    const name = document.getElementById("name-input");
    const description = document.getElementById("description-input");
    const price = document.getElementById("price-input");
    const img = document.getElementById("img-input");
    const weight = document.getElementById("weight-input");


    const newProduct = new Product(code.value, category.value, name.value, description.value, price.value, img.value, weight.value);

    if (localStorage.hasOwnProperty("Products")) {
      products = JSON.parse(localStorage.getItem("Products"))
    }

    products.forEach((value) => {
      newProduct.id = newProduct.id + 1;
    });

    products.push(newProduct);

    localStorage.setItem('Products', JSON.stringify(products));
  });
}


registerProducts();
