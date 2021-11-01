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


updateCategory();
