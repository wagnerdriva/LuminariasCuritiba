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
  //window.open(`http://loja.buiar.com/?key=q3hfZsQuaw&f=json&c=boleto&t=listar&id=${pedido.id}`, '_blank').focus();

  window.open(
    `http://loja.buiar.com/?key=q3hfZsQuaw&f=json&c=boleto&t=listar&id=${pedido.id}`,
    "win",
    `width=800,height=400,screenX=200,screenY=200`
  );
});

localStorage.removeItem("carrinho");