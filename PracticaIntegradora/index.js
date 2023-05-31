import express from "express";
import productsRouter from "./routes/products.router.js";

import { errorHandler } from "./middlewares/errorHandler.js";
import "./db/db.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

app.use("/api/products", productsRouter);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`🚀 El servidor se encuentra en el puerto: ${PORT} 🚀`);
});
