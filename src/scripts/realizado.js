// apagar carrinho
// mostrar o numero do pedido
import { executeAPI } from "../admin/backend.js";

let pedido = localStorage.getItem("pedido");

pedido = JSON.parse(pedido);
console.log(pedido);
document.getElementById("pedido").innerHTML =
  "Pedido realizado, ID #" + pedido.id;

let fields = `id=${pedido.id}`;

document.getElementById("boleto").addEventListener("click", () => {
  executeAPI("boleto", "listar", fields, false)
    .then((result) => {
      const winUrl = URL.createObjectURL(
        new Blob([result], { type: "text/html" })
      );

      window.open(
        winUrl,
        "win",
        `width=800,height=400,screenX=200,screenY=200`
      );
    })
    .catch((error) => console.log(error));
});

localStorage.removeItem("carrinho");
