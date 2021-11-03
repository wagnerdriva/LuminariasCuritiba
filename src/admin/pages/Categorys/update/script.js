const form = document.getElementById("update-form");


function updateCategory() {
  const submit = document.getElementById("submit-form");
  submit.addEventListener('click', function(e) {
    e.preventDefault();
    let categorys = [];
    const id = document.getElementById("id-input").value;
    const name = document.getElementById("name-input").value;


    if (localStorage.hasOwnProperty("Categorys")) {
      categorys = JSON.parse(localStorage.getItem("Categorys"))
    }

    console.log(categorys);

    categorys.map((category) => {
      if (category.id == id) {
        console.log(category.id)
        category.name = name;
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

  const select = document.getElementById('id-input');

  allCategorys.forEach(element => {
    let opt = document.createElement('option');
    opt.value = element.id;
    opt.innerHTML = element.id;
    select.appendChild(opt);
  })
}

getCategorys();
updateCategory();
