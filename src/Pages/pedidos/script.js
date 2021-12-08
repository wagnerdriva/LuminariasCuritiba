function addOrderLine(atributeName, atributeContent, div) {
  let textElement = document.createElement('p')
  let strongElement = document.createElement('span')
  let titlenode = document.createTextNode(`${atributeName}: `);
  let textnode = document.createTextNode(`${atributeContent}`);

  strongElement.classList = ["atribute-title"]
  textElement.classList = ["atribute"]

  strongElement.appendChild(titlenode)
  textElement.appendChild(strongElement)
  textElement.appendChild(textnode)
  div.appendChild(textElement)
}

async function createRequest(id) {
  const api = `http://loja.buiar.com/?key=q3hfZsQuaw&c=pedido&t=listar&f=json`;

  let request = new XMLHttpRequest();
  await request.open("GET", api, false);
  request.setRequestHeader('Accept', '*/*');
  await request.send();
  let data = JSON.parse(request.response);

  return data;
}


async function getOrderById() {
  let form = document.getElementById("form");
  let orderById; 

  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    let id = document.getElementById("input-id").value.toString();
  
    let orders = await createRequest(id);
    orders = orders.dados;
    
    orders.map((order) => {
      if (order.id === id) {
        orderById = order;
      }
    });
  });
  console.log(orderById)
  return orderById;
}

async function main() {

  form.addEventListener('submit', async function(event) {
    event.preventDefault();

    let id = document.getElementById("input-id").value.toString();
  
    let orders = await createRequest(id);
    orders = orders.dados;
    
    orders.map((order) => {
      if (order.id === id) {
        let list = document.getElementById("order-list");
        let orderInfoDiv = document.createElement("div");
        orderInfoDiv.classList = ["order-info"];
  
        addOrderLine("ID do Pedido", order.id, orderInfoDiv);
        addOrderLine("Tempo", order.time, orderInfoDiv);
        addOrderLine("Nome", order.nome, orderInfoDiv);
        addOrderLine("CPF", order.cpf, orderInfoDiv);
        addOrderLine("CEP", order.cep, orderInfoDiv);
        addOrderLine("RUA", order.rua, orderInfoDiv);
        addOrderLine("Número", order.numero, orderInfoDiv);
        addOrderLine("Complemento", order.complemento, orderInfoDiv);
        addOrderLine("Bairro", order.bairro, orderInfoDiv);
        addOrderLine("Cidade", order.cidade, orderInfoDiv);
        addOrderLine("Estado", order.uf, orderInfoDiv);
        
        let orderDiv = document.createElement("div");
        orderDiv.classList = ["order"];
        orderDiv.appendChild(orderInfoDiv);
  
        list.appendChild(orderDiv);
      }
    });
  });
}

await main();
