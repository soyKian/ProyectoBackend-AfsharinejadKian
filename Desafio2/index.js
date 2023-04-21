class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, stock = 200) {
    const product = {
      id: this.newId() + 1,
      title,
      description,
      price,
      thumbnail,
      stock,
    };

    if ((!title, !description, !price, !thumbnail)) {
      return console.error(
        "¡Todos los campos son obligatorios!, No se añadio el producto ",
        title
      );
    } else {
      return this.products.push(product);
    }
  }

  newId() {
    let min = 0;
    this.products.map((product) => {
      if (product.id > min) {
        min = product.id;
      }
    });
    return min;
  }

  getProductById(id) {
    const searchId = this.products.find((product) => product.id === id);

    return !searchId
      ? console.error("¡Producto no encontrado!")
      : console.log("¡Producto encontrado!: ", searchId);
  }
}

const productos = new ProductManager();

console.log(productos.getProducts());

productos.addProduct(
  "Louis Vuitton Bag",
  "LV N41358 Neverfull MM",
  2030,
  "https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-neverfull-mm-damier-ebene-handbags--N41358_PM2_Front%20view.jpg",
  5
);

productos.addProduct(
  "Louis Vuitton Backpack",
  "LV M46237 Ellipse Backpack",
  3300,
  "https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-ellipse-backpack--M46237_PM2_Front%20view.jpg",
  2
);

productos.addProduct("Louis Vuitton Shoes", "", 5000, "", 0);

console.log(productos.getProducts());
productos.getProductById(2);
productos.getProductById(3);
