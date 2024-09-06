import { Router } from "express";
import ProductsController from "../controllers/product.controller";

const productRouter = Router();


productRouter
    .get("/server_details", ProductsController.getServerDetails)
    .put("/products/:code", ProductsController.putProducts)
    .delete("/products/:code", ProductsController.deleteProducts)
    .get("/products/:code", ProductsController.getProductsByCode)
    .get("/products",ProductsController.getProducts);

export default productRouter;