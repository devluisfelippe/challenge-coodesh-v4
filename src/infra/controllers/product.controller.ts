import { Request, Response } from "express";
import { IProductsRepository, ProductsDatabase } from "../../domain/repositories/products.repository";
import { IProductsService, ProductsService } from "../../application/services/products.service";
import ProductDto from "../../application/dto/product.dto";

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
        try {
            const _code = req.params.code;
            const productData = await ProductDto.validate(req.body);
            const productUpdated = await productsService.updateProduct(_code, productData);
            res.send({ message: `Produtos alterados: ${productUpdated}`}).status(201);
        } catch (error) {
            res.send({ message: error.message }).status(400);
        }
    }

    static async deleteProducts(req: Request, res: Response) {
        try {
            const _code = req.params.code;
            const productDeleted = await productsService.deleteProduct(_code);
            res.send({ message: `Produtos deletados: ${productDeleted}` }).status(201);
        } catch (error) {
            res.send({ message: error.message }).status(400);
        }
    }

    static async getProductsByCode(req: Request, res: Response) {
        try {
            const _code = req.params.code;
            const product = await productsService.findProductByCode(_code);
            res.send(product).status(200);
        } catch (error) {
            res.send({ message: error.message }).status(400);
        }
    }

    static async getProducts(req: Request, res: Response) {
        await productsService.findProducts();
    }
}

export default ProductsController;