
import { Router } from "express";

import { getAllService } from "../services/products.services.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await getAllService();
    res.render("products", {products});
  } catch (error) {
    console.log(error);
  }
});

export default router;