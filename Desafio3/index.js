import express from "express";
import productsRouter from "./routes/products.router.js";
// import cartRouter from "./Routes/cart.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productsRouter);
// app.use("/cart", cartRouter);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`El servidor se encuentra en el puerto: ${PORT}`);
});
