const form = document.getElementById("register-form");

class Category {
  constructor(name){
    this.id = 0;
    this.name = name;
  }
}


function registerCategory() {
  const submit = document.getElementById("submit-form");
  submit.addEventListener('click', function(e) {
    e.preventDefault();
    let categorys = [];
    const name = document.getElementById("name-input");
    const newCategory = new Category(name.value);

    if (localStorage.hasOwnProperty("Categorys")) {
      categorys = JSON.parse(localStorage.getItem("Categorys"))
    }

    categorys.forEach((value) => {
      newCategory.id = newCategory.id + 1;
    });

    categorys.push(newCategory);

    localStorage.setItem('Categorys', JSON.stringify(categorys));
  });
}


registerCategory();
