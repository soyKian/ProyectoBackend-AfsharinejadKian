import { Router } from "express";
const router = Router();
import ProductManager from "../componentes/product.manager.js";
const productManager = new ProductManager;

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productManager.getProductById(Number(id));
    if (product) {
      res.status(200).json({ message: "Producto encontrado", product });
    } else {
      res.status(400).send("Producto no encontrado");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const product = req.body;
    const newProduct = await productManager.addProduct(product);
    res.json(newProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const product = req.body;
    const { id } = req.params;
    const productFile = await productManager.getProductById(Number(id));
    if (productFile) {
      await productManager.updateProduct(product, Number(id));
      res.send(`Producto actualizado exitosamente`);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await productManager.getProducts();
    if (products.length > 0) {
      await productManager.deleteProduct(Number(id));
      res.send(`Producto con id: ${id} fue eliminado exitosamente`);
    } else {
      res.send(`Producto con id: ${id} no encontrado`);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    await productManager.deleteProduct();
    res.send("Productos eliminado exitosamente");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
