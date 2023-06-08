import ProductsDaoMongo from "../daos/mongoDB/products.dao.js";
const productsManager = new ProductsDaoMongo();


export const getAllService = async () => {
  try {
    const docs = await productsManager.getProducts();
    return docs;
  } catch (error) {
        console.log(error);
  }
};

export const getByIdService = async (id) => {
  try {
    const doc = await productsManager.getProductById(id);
    if (!doc)return(`El producto con id ${id} que estas buscando, NO se encontró!`);
    else return doc;
  } catch (error) {
        console.log(error);
  }
};

export const checkDuplicateCode = async (code) =>{
    try {
        const doc = await productsManager.checkDuplicateCode(code);
        if (doc) {
          throw new Error (`Ya hay un producto con el codigo ${code}!`);
        }
    } catch (error) {
        console.log(error);
    }
} 

export const addService = async (obj) => {
  try {
    const newProduct = await productsManager.addProduct(obj);
    if (!newProduct)
      throw new Error(
        "Error: falta rellenar y hay campos duplicados"
      );
    else return newProduct;
  } catch (error) {
        console.log(error);
  }
};

export const updateService = async (
  id, obj ) => {
  try {
    const doc = await productsManager.getProductById(id);
    if (!doc) {
      return (`El producto con id ${id} no fue encontrado!`);
    } else {
      const prodUpdated = await productsManager.updateProduct(
        id,
        obj
      );
      return prodUpdated;
    }
  } catch (error) {
        console.log(error);
  }
};

export const deleteService = async (id) => {
  try {
    const doc = await productsManager.getProductById(id);

    if (!doc) {
        return (`El producto con id ${id} no fue encontrado!`);
    } else {
        const deleated = await productsManager.deleteProduct(id);
        return `El producto con id ${id} fue removido correctamente!` + deleated;
    }

  } catch (error) {
        console.log(error);
  }
};