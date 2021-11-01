const request = localStorage.getItem("Categorys").replace(/{/g, '').replace(/"/g, '').replace(/\[/g, '').replace(/\]/g, '').replace(/,/g, '');
let allCategorys = request.split("}");

console.log(allCategorys);

allCategorys.map((category) => {
  console.log(category);

  let list = document.getElementById('category-list');
  let element = document.createElement('p')
  element.innerHTML = `${category}`;
  list.appendChild(element);
});

