async function createRequest() {
  const api = `http://loja.buiar.com/?key=q3hfZsQuaw&c=pedido&t=listar&f=json`;

  let request = new XMLHttpRequest();
  await request.open("GET", api, false);
  request.setRequestHeader('Accept', '*/*');
  await request.send();
  let data = JSON.parse(request.response);
  return data;
}

function addOrderLine(atributeName, atributeContent, div) {
  let textElement = document.createElement("p");
  let strongElement = document.createElement("span");
  let titlenode = document.createTextNode(`${atributeName}: `);
  let textnode = document.createTextNode(`${atributeContent}`);

  strongElement.classList = ["atribute-title"];
  textElement.classList = ["atribute"];

  strongElement.appendChild(titlenode);
  textElement.appendChild(strongElement);
  textElement.appendChild(textnode);
  div.appendChild(textElement);
}


async function createList() {
  let orders = await createRequest();
  orders = orders.dados;

  orders.map((order) => {
    let list = document.getElementById("order-list");
    let orderInfoDiv = document.createElement("div");
    orderInfoDiv.classList = ["order-info"];

    addOrderLine("ID do Pedido", order.id, orderInfoDiv);
    addOrderLine("Tempo", order.time, orderInfoDiv);
    addOrderLine("Nome", order.nome, orderInfoDiv);
    addOrderLine("CPF", order.cpf, orderInfoDiv);
    addOrderLine("CEP", order.cep, orderInfoDiv);
    addOrderLine("RUA", order.rua, orderInfoDiv);
    addOrderLine("Número", order.number, orderInfoDiv);
    addOrderLine("Complemento", order.complemento, orderInfoDiv);
    addOrderLine("Bairro", order.bairro, orderInfoDiv);
    addOrderLine("Cidade", order.id, orderInfoDiv);
    addOrderLine("Estado", order.id, orderInfoDiv);


    let orderDiv = document.createElement("div");
    orderDiv.classList = ["order"];
    orderDiv.appendChild(orderInfoDiv);

    list.appendChild(orderDiv);
  });
}

createList();