import express from "express";
import productRouter from "./infra/routes/product.router";
import "dotenv/config";
import "./infra/db/db.config";

const app = express();
app.use(express.json());
app.use(productRouter);

export default app;





