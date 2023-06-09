import fs from "fs";
import Path from "../path.js";
const path = Path;

export default class ProductManager {
  #lastId = 0;

  constructor() {
    this.path = `${path}/json/productos.json`;
  }

  async #newId() {
    const productFile = await this.getProducts();

    let min = 0;
    productFile.map((product) => {
      if (product.id > min) {
        min = product.id;
      }
    });
    return min;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        const productsJSON = JSON.parse(products);
        return productsJSON;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  //añadir productos
  async addProduct(obj) {
    try {
      const camposFaltantes = [];

      if (!obj.title) {
        camposFaltantes.push("title");
      }
      if (!obj.price) {
        camposFaltantes.push("price");
      }
      if (!obj.stock) {
        camposFaltantes.push("stock");
      }
      if (!obj.description) {
        camposFaltantes.push("description");
      }
      if (!obj.code) {
        camposFaltantes.push("code");
      }
      if (camposFaltantes.length > 0) {
        console.log("Falta ingresar " + camposFaltantes.join(", "));
      } else {
        const product = {
          id: (await this.#newId()) + 1,
          ...obj,
        };
        const productsFile = await this.getProducts();
        productsFile.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }

  //obtener productos por id
  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const product = products.find((prod) => prod.id === id);
      if (product) {
        return product;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  //actualizar productos
  async updateProduct(obj, id) {
    try {
      const productsFile = await this.getProducts();
      const index = productsFile.findIndex((prod) => prod.id === id);
      if (index === -1) {
        throw new Error(`La id ingresada ${id} no se encontro`);
      } else {
        productsFile[index] = { id, ...obj };
      }
      await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
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
        console.log(`Se elimino el producto id `, { productId });
      } else {
        console.log(`El producto id ${productId} no existe`);
      }
    } catch (error) {
      console.log(error);
    }
  }
} //fin productmanager
