

import {
  getCartsAllService,
  getCartByIdService,
  createCartService,
  addProductToCartService,
  deleteProductToCartService,
  deleteProductFromCartService,
  updateProductQuantityService,
} from "../services/carts.services.js";
  
export const getCartsController = async (req, res, next) => {
  try {
      const docs = await getCartsAllService();
      if (docs.length === 0) {
        res.status(400).send({status: "error", message: "No se encontro el carrito", payload: docs})
      } else {
        res.status(200).send({status: "success", message:"El carrito fue encontrado", payload: docs})
      }
  } catch (error) {
      next(error);
  }
}
  
  export const getCartByIdController = async (req, res, next) => {
    try {
       const { cid } = req.params;
       const docs = await getCartByIdService(Number(cid));

       res.status(200).json(docs);
    } catch (error) {
      next(error);
    }
  };
  
  export const createCartController = async (req, res, next) => {
    try {
      const docs = await createCartService();
      res.status(201).send(docs)
    } catch (error) {
      next(error);
    }
  };
  
  export const addProductToCartController = async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      const product = await addProductToCartService(cid,pid);

      if (product) {
        res.status(201).send({status: "success",mensaje: "El producto fue añadido al carrito!",payload: product});
      } else {
        res.status(404).send({status: "error",mensaje:"El producto o carrito que estas buscando no se encontro!"});
      } 
    } catch (error) {
      next(error);
    }
  };


  export const updateProductQuantityController = async (req,res, next) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
  
      const updatedCart = await updateProductQuantityService(cid, pid, quantity);
      if (!updatedCart) {
        return res.status(404).json({ message: "Carrito o producto no encontrado" });
      }
  
      return res
        .status(200)
        .json({
          message: "La cantidad del producto ha sido actualizada",
          payload: updatedCart,
        });
    } catch (error) {
      next(error);
    }
  }
  
  export const deleteProductToCartController = async (req, res, next) => {
    try {
      const {cid} = req.params;
      const productsDeleted = await deleteProductToCartService(cid); 
      if (productsDeleted ) {
        res.status(201).send({status: "success",mensaje: "Producto ha sido borrado del carrito",payload: productsDeleted });
      } else {
        res.status(404).send({status: "error",mensaje:"El producto o carrito que esta buscando no ha sido encontrado"});
      } 
    } catch (error) {
        next(error);
    }
  }
  
  export const deleteProductFromCartController = async (req, res, next) => {
    try {
      const {cid, pid} = req.params;
      const productDeleted = await deleteProductFromCartService(cid,pid); 
      if (productDeleted ) {
        res.status(201).send({status: "success",mensaje: "El producto que ha seleccionado ha sido borrado del carrito!"});
      } else {
        res.status(404).send({status: "error",mensaje:"El producto o carrito que ha buscado no se encontro"});
      } 
    } catch (error) {
        next(error);
    }
  }