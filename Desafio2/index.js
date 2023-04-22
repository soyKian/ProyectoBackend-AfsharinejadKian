const fs = require("fs");
class ProductManager {
  #lastId = 0;

  constructor() {
    this.path = "./productos.json";
  }
  

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        const productsJS = JSON.parse(products);
        return productsJS;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  //añadir productos
  async addProduct(title, description, price, thumbnail, stock = 200, code) {
    try {
      if (!title || !description || !price || !thumbnail || !code) {
        return console.error(
          "¡Todos los campos son obligatorios!, No se añadio el producto ",
          title
        );
      } else {
        const productFile = await this.getProducts();
        const existCode = productFile.find((product) => product.code === code);

        if (!existCode) {
          const product = {
            id: this.#newId(),
            title,
            description,
            price,
            thumbnail,
            stock,
            code,
          };

          productFile.push(product);
          await fs.promises.writeFile(this.path, JSON.stringify(productFile));
        } else {
          console.log(`Ya existe un producto con el código ${code}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  #newId() {
    this.#lastId++;
    return this.#lastId;
  }

  //obtener productos por id
  async getProductById(id) {
    try {
      const productFile = await this.getProducts();
      const productFind = productFile.find((product) => product.id === id);

      return !productFind
        ? console.error(`¡Producto con id ${id} no encontrado!`)
        : console.log(`¡Producto con id ${id} encontrado!:`, productFind);
    } catch (error) {
      console.log(error);
    }
  }

  //actualizar productos
  async updateProduct(productId, updateFile) {
    try {
      const productFile = await this.getProducts();
      const findProduct = productFile.findIndex(
        (product) => product.id === productId
      );

      if (findProduct !== -1) {
        const updateData = {
          ...productFile[findProduct],
          ...updateFile,
          id: productId,
        };
        productFile[findProduct] = updateData;
        await fs.promises.writeFile(this.path, JSON.stringify(productFile));
        console.log("¡Se realizo los cambios de forma exitosa: ", updateData);
      } else {
        console.log(`¡Producto ID ${productId} no existe.`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Eliminar productos
  async deleteProduct(productId) {
    try {
      const productFile = await this.getProducts();
      const findProduct = productFile.findIndex(
        (product) => product.id === productId
      );

      if (findProduct !== -1) {
        productFile.splice(findProduct, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(productFile));
        console.log(`Se elimino el producto id `,{productId});
      } else {
        console.log(`El producto id ${productId} no existe`);
      }
    } catch (error) {
      console.log(error);
    }
  }
} //fin productmanager

const productos = new ProductManager();

console.log(productos.getProducts());

async function prueba() {
  const consulta = await productos.getProducts();
  console.log("La consulta del array de productos dio: ", consulta);

  productos.addProduct(
    "Louis Vuitton Bag",
    "LV N41358 Neverfull MM",
    2030,
    "https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-neverfull-mm-damier-ebene-handbags--N41358_PM2_Front%20view.jpg",
    5,
    "A267X",
  );

  productos.addProduct(
    "Louis Vuitton Backpack",
    "LV M46237 Ellipse Backpack",
    3300,
    "https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-ellipse-backpack--M46237_PM2_Front%20view.jpg",
    2,
    "A19DAS",
  );

  const consulta2 = await productos.getProducts();
  console.log("La 2da consulta del array con productos añadidos dio: ", consulta2);

  //corroboracion de existencia de productos
  await productos.getProductById(1);
  await productos.getProductById(2);
  await productos.getProductById(5);

  //se actualizan productos
  await productos.updateProduct(1, {stock:0})
  const consulta3 = await productos.getProducts();
  console.log("La 3ra consulta del array con productos actualizados dio: ", consulta3);

  //se remueve un producto
  await productos.deleteProduct(2)
  const consulta4 = await productos.getProducts();
  console.log("La 3ra consulta del array con productos actualizados dio: ", consulta4);


  // productos.addProduct("Louis Vuitton Shoes", "", 5000, "", 0);

  // console.log(productos.getProducts());
  // productos.getProductById(2);
  // productos.getProductById(3);
}

prueba();
