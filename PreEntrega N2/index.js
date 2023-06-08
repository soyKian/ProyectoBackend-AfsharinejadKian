
import express from "express";
import { __dirname } from "./path.js";
import handlebars from "express-handlebars";
import "./db/db.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewProducts from "./routes/views.router.js";

import { errorHandler } from "./middlewares/errorHandler.js";
import "./db/db.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(morgan('dev'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(errorHandler);

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/messages", messagesRouter);

app.use("/products", viewProducts);


app.use('/users', usersRouter);
app.use('/pets', petsRouter);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`🚀 El servidor se encuentra en el puerto: ${PORT} 🚀`);
});
