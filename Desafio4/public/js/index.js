const socketClient = io();

const form = document.getElementById("form");
const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");
const inputPrice = document.getElementById("price");
const inputCode = document.getElementById("code");
const inputCategory = document.getElementById("category");
const inputStock = document.getElementById("stock");
const inputThumbnail = document.getElementById("thumbnail");


form.onsubmit = (e) => {
    e.preventDefault();
    const title = inputTitle.value;
    const description = inputDescription.value;
    const price = inputPrice.value;
    const code = inputCode.value;
    const category = inputCategory.value;
    const stock = inputStock.value;
    const thumbnail = inputThumbnail.value;

    socketClient.emit("newProduct", { title, description, price, code, category, stock, thumbnail });
    return true;
};


socketClient.on("getProducts", (products) => {
  let data = "";

  products.forEach((product) => {
    data += `
        <div style="display:flex; border:2px solid black;">
           <div>
                <p>Nombre del producto: ${product.title}</p>
                <p>Descripción: ${product.description}</p>
                <p>Precio: $ ${product.price}</p>
                <p>Código del producto: ${product.code}</p>
                <p>Categoría del producto: ${product.category}</p>
                <p>Stock del producto: ${product.stock}</p>
                <div>
                    <button onclick="deleteProduct(${product.id})">Eliminar</button>
                </div>
           </div>
           <div>
                <img style="width: 200px; height: 200px" src="${product.thumbnail}" alt="${product.description}">
           </div>
        </div>
    `;
  });

  const productList = document.getElementById("products");
  productList.innerHTML = data;
});

socketClient.on("deleteProduct", (id) => {
  const productElement = document.getElementById(id);
  if (productElement) {
    productElement.remove();
  }
});

function deleteProduct(id) {
  socketClient.emit("deleteProduct", id);
}