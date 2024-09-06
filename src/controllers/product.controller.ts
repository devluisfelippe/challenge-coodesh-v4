import { Request, Response } from "express";
import { IProductsService, ProductsService } from "../services/products.service";
import { IProductsRepository, ProductsDatabase } from "../repositories/products.repository";

const productsDatabase: IProductsRepository = new ProductsDatabase();
const productsService: IProductsService = new ProductsService(productsDatabase);

class ProductsController {

    static async getServerDetails(req: Request, res: Response) {
        try {
            const serverDetails = await productsService.findServerDetails();
            res.send(serverDetails).status(200);
        } catch (error) {
            res.send({ message: error.message }).status(400);
        }
    };

    static async putProducts(req: Request, res: Response) {
        await productsService.updateStatusProduct();
    }

    static async deleteProducts(req: Request, res: Response) {
        await productsService.deleteProduct();
    }

    static async getProductsByCode(req: Request, res: Response) {
        await productsService.findProductByCode();
    }

    static async getProducts(req: Request, res: Response) {
        await productsService.findProducts();
    }
}

export default ProductsController;