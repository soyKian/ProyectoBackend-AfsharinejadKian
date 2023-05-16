import fs from "fs";
import Path from "../path.js";
const path = Path;

export default class CartManager {
  #lastId = 0;

  constructor() {
    this.path = `${path}/json/carrito.json`;
  }

  async #newId() {
    const cartFile = await this.obtenerCarritos();

    let min = 0;
    cartFile.map((cart) => {
      if (cart.id > min) {
        min = cart.id;
      }
    });
    return min;
  }


  //muestra carritos - funciona
  async obtenerCarritos() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await fs.promises.readFile(this.path, "utf-8");
        const cartsJSON = JSON.parse(carts);
        return cartsJSON;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  //crea carritos -- funciona
  async crearCarrito() {
    try {
      const cart = {
        id: (await this.#newId()) + 1,
        products: [],
      };
      const cartFile = await this.obtenerCarritos();
      cartFile.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(cartFile));
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  //obtener carrito por id -- funciona
  async carritoPorID(cid) {
    try {
      const cartFile = await this.obtenerCarritos();
      const cartFind = cartFile.find((cart) => cart.cid === cid);

      if (cartFind) {
        return cartFind;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  //añadir producto al carrito 
  async productoAlCarrito(cid, pid) {
    try {
      let allCarts = await this.obtenerCarritos();
      const findCart = await this.carritoPorID(cid);
      if (findCart) {
        const productExist = findCart.products.find((product) => product.pid === pid);
        console.log(productExist.quantity)
        if (!productExist) {
          const newProd = {
            quantity: 1,
            pid: pid,
          };
          findCart.products.push(newProd);
          const index = allCarts.findIndex((cart) => cart.cid === cid);
          allCarts[index] = findCart;
          console.log(allCarts);
          await fs.promises.writeFile(this.path, JSON.stringify(allCarts));
          return findCart;

        } else {
          // Si el producto ya existe, sumamos 1 a su cantidad
          productExist.quantity += 1;
  
          // Buscamos el índice del carrito dentro del array allCarts
          const index = allCarts.findIndex((cart) => cart.cid === cid);
  
          // Modificamos el objeto findCart dentro de allCarts
          allCarts[index].products = findCart.products;
  
          // Guardamos los cambios en el archivo JSON
          await fs.promises.writeFile(this.path, JSON.stringify(allCarts));
  
          // Devolvemos el objeto modificado
          return (findCart);
        }
      } else {
        throw new Error(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
