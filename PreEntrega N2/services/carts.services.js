import CartsDaoMongo from "../daos/mongoDB/carts.dao.js";
const cartsManager = new CartsDaoMongo();

export const getCartsAllService = async () => {
  try {
    const docs = await cartsManager.getAllCart();
    return docs;
  } catch (error) {
    console.log(error);
  }
};

export const getCartByIdService = async (cid) => {
  try {
    const doc = await cartsManager.getCartById(cid);

    if (!doc) return `El carrito con id ${cid} no se encontró!`;
    else return doc;
  } catch (error) {
    console.log(error);
  }
};

export const createCartService = async () => {
  try {
    const doc = await cartsManager.createCart();
    return doc;
  } catch (error) {
    console.log(error);
  }
};

export const addProductToCartService = async (cid, pid) => {
  try {
    const doc = await cartsManager.addProductToCart(cid, pid);

    return doc;
  } catch (error) {
    console.log(error);
  }
};

export const updateProductQuantityService = async (cid, pid, quantity) => {
  try {
    const doc = await cartsManager.updateProductQuantity(cid, pid, quantity);
    return doc;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductToCartService = async (cid) => {
  try {
    const doc = await cartsManager.deleteProductToCart(cid);
    return doc;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductFromCartService = async (cid, pid) => {
  try {
    const doc = await cartsManager.deleteProductFromCart(cid, pid);
    return doc;
  } catch (error) {
    console.log(error);
  }
};
