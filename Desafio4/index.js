import express from "express";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.routes.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/cart.router.js";
import ProductManager from "./Managers/ProductManager.js";

import { __dirname } from "./path.js";

const app = express();
const productManager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// app.use("/products", productsRouter);
// app.use("/carts", cartsRouter);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


app.use("/", viewsRouter);

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
  console.log(`🚀 El servidor se encuentra en el puerto: ${PORT} 🚀`);
});

const socketServer = new Server(httpServer);


socketServer.on("connection", async(socket) => {
  console.log("Usuario Conectado");

  socketServer.emit("getProducts", await productManager.getProducts());

  socket.on("disconnect", () => {
    console.log("Usuario Desconectado");
  });
  socket.on("newProduct", async (product) => {
    await productManager.addProduct(
      product.title,
      product.description,
      product.price,
      product.code,
      product.category,
      product.stock,
      product.thumbnails
    );
    const products = await productManager.getProducts();
    socketServer.emit("getProducts", products);
  });
  socket.on("deleteProduct", async (id) => {
    await productManager.deleteProduct(id);
    const products = await productManager.getProducts();
    socketServer.emit("deleteProduct", id);
    socketServer.emit("getProducts", products);
  });
});