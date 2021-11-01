const request = localStorage.getItem("Products").replace(/{/g, '').replace(/"/g, '').replace(/\[/g, '').replace(/\]/g, '').replace(/,/g, '');
let allProducts = request.split("}");

console.log(allProducts);

allProducts.map((product) => {
  console.log(product);

  let list = document.getElementById('product-list');
  let element = document.createElement('p')
  element.innerHTML = `${product}`;
  list.appendChild(element);
});

