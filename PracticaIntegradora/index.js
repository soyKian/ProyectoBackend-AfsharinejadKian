import express from "express";
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';

import { errorHandler } from "./middlewares/errorHandler.js";
import "./db/db.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(morgan('dev'));

app.use('/users', usersRouter);
app.use('/pets', petsRouter);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`🚀 El servidor se encuentra en el puerto: ${PORT} 🚀`);
});
