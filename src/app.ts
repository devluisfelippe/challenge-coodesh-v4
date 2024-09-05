import express from "express";
import router from "./routes/product.router";

const app = express();
app.use(router);

export default app;





