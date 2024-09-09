"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_repository_1 = require("../../domain/repositories/products.repository");
const products_service_1 = require("../../application/services/products.service");
const product_dto_1 = __importDefault(require("../../application/dto/product.dto"));
const productsDatabase = new products_repository_1.ProductsDatabase();
const productsService = new products_service_1.ProductsService(productsDatabase);
class ProductsController {
    static async getServerDetails(req, res) {
        try {
            const serverDetails = await productsService.findServerDetails();
            res.send(serverDetails).status(200);
        }
        catch (error) {
            res.send({ message: error.message }).status(400);
        }
    }
    ;
    static async putProducts(req, res) {
        try {
            const _code = req.params.code;
            const productData = await product_dto_1.default.validate(req.body);
            const productUpdated = await productsService.updateProduct(_code, productData);
            res.send({ message: `Produtos alterados: ${productUpdated}` }).status(201);
        }
        catch (error) {
            res.send({ message: error.message }).status(400);
        }
    }
    static async deleteProducts(req, res) {
        try {
            const _code = req.params.code;
            const productDeleted = await productsService.deleteProduct(_code);
            res.send({ message: `Produtos deletados: ${productDeleted}` }).status(201);
        }
        catch (error) {
            res.send({ message: error.message }).status(400);
        }
    }
    static async getProductsByCode(req, res) {
        try {
            const _code = req.params.code;
            const product = await productsService.findProductByCode(_code);
            res.send(product).status(200);
        }
        catch (error) {
            res.send({ message: error.message }).status(400);
        }
    }
    static async getProducts(req, res) {
        try {
            const { page } = req.query;
            const productsWithPagination = await productsService.findProducts(page);
            res.send(productsWithPagination).status(200);
        }
        catch (error) {
            res.send({ message: error.message }).status(400);
        }
        ;
    }
}
exports.default = ProductsController;
