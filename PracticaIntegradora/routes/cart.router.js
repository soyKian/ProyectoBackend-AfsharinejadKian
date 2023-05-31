import { Router } from "express";
const router = Router();
import CartManager from "../componentes/cart.manager.js";
const cartManager = new CartManager();


router.get("/", async (req, res) => {
  try {
    const carts= await cartManager.obtenerCarritos();
    res.status(200).json(carts);
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
    console.error(error);
  }
})

router.post("/", async (req, res) => {
    try {
      await cartManager.crearCarrito();
      res.status(200).send({status:"success", message: "Carrito creado exitosamente!"})
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  router.get("/:cid", async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await cartManager.carritoPorID(Number(cid));
      if (cart) {
        res.status(200).json({ message: "Carrito encontrado", cart });
      } else {
        res.status(400).send("Carrito no encontrado");
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  router.post("/:cid/products/:pid", async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const product = await cartManager.productoAlCarrito(Number(cid), Number(pid));
      if (product){
          res.status(201).send({ status: "success", mensaje: "Product successfully added to cart!"});
      }else {
          res.status(404).send({ status: "error", mensaje:"Product or cart not found!"});
      }
      
    } catch (error) {
      res.status(404).json({ status: "error", message: error.message });
      console.error(error);
    }
  });

export default router;
