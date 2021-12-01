// apagar carrinho
// mostrar o numero do pedido
import { executeAPI } from "../admin/backend.js";

let pedido = localStorage.getItem("pedido");

pedido = JSON.parse(pedido);
console.log(pedido);
document.getElementById("pedido").innerHTML =
  "Pedido realizado, ID #" + pedido.id;

let fields = `id=${pedido.id}`;

executeAPI("boleto", "listar", fields, false)
  .then((result) => {
    console.log(result);
    var wnd = window.open("about:blank", "", "_blank");
    wnd.document.write(result);
    // document.getElementById('boleto').setAttribute("href", "xyz.php");
  })
  .catch((error) => console.log(error));

localStorage.removeItem("carrinho");
