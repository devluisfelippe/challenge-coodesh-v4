import express from "express";
import productRouter from "./routes/product.router";
import "dotenv/config";
import "./db/db.config";

const app = express();
app.use(express.json());
app.use(productRouter);

export default app;





