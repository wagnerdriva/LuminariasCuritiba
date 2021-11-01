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


    categorys.map((category) => {
      console.log(category);
      if (category.name == idName ||category.id == idName) {
        let index = categorys.indexOf(category);
        console.log("entrou no if")
        category = categorys.splice(index, 1);
      }
    });

    localStorage.setItem('Categorys', JSON.stringify(categorys));
  });
}


removeCategory();
