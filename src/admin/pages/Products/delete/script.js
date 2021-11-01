const form = document.getElementById("update-form");


function removeProduct() {
  const submit = document.getElementById("submit-form");
  submit.addEventListener('click', function(e) {
    e.preventDefault();
    let products = [];
    const idName = document.getElementById("idName-input").value;

    if (localStorage.hasOwnProperty("Products")) {
      products = JSON.parse(localStorage.getItem("Products"))
    }


    products.map((product) => {
      console.log(product);
      if (product.name == idName ||product.id == idName) {
        let index = products.indexOf(product);
        product = products.splice(index, 1);
      }
    });

    localStorage.setItem('Products', JSON.stringify(products));
  });
}


removeProduct();
