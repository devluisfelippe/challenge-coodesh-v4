"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const product_entity_1 = require("../../domain/entities/product.entity");
const apiOpenFoodFacts_1 = __importDefault(require("../../infra/api/apiOpenFoodFacts"));
const db_config_1 = require("../../infra/db/db.config");
const dateConverter_1 = __importDefault(require("../../utils/dateConverter"));
class ProductsService {
    productsRepository;
    apiOpenFoodFacts;
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
        this.apiOpenFoodFacts = new apiOpenFoodFacts_1.default();
    }
    async findServerDetails() {
        try {
            const onlineTime = process.uptime();
            const memoryUsage = process.memoryUsage();
            const { dbConnection } = await (0, db_config_1.databaseConnected)();
            const logCron = await this.productsRepository.findLastLog();
            const dateLogFormatted = await (0, dateConverter_1.default)(logCron.created_at);
            const serverDetails = {
                onlineTime: `${Math.floor(onlineTime / 3600)}h ${Math.floor((onlineTime % 3600) / 60)}min ${Math.floor(onlineTime % 60)}s`,
                memoryUsage: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
                dbConnection,
                lastCronRun: dateLogFormatted
            };
            return serverDetails;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async insertProducts() {
        try {
            const products = await this.apiOpenFoodFacts.getProducts();
            await this.productsRepository.createProducts(products);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async updateProduct(_code, productData) {
        try {
            const productFinded = await this.productsRepository.findProductByCode(_code);
            const productUpdate = new product_entity_1.Product(productFinded);
            productUpdate.updateStatus(productData);
            const productUpdated = await this.productsRepository.updateProduct(_code, productUpdate.getStatus());
            return productUpdated;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async deleteProduct(_code) {
        try {
            const productFinded = await this.productsRepository.findProductByCode(_code);
            const productDelete = new product_entity_1.Product(productFinded);
            productDelete.updateStatus(product_entity_1.StatusProduct.TRASH);
            const productDeteled = await this.productsRepository.updateProduct(_code, productDelete.getStatus());
            return productDeteled;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async findProductByCode(_code) {
        try {
            const productFinded = await this.productsRepository.findProductByCode(_code);
            return productFinded;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async findProducts(pageNumber) {
        try {
            const countProductsPage = 10;
            const page = pageNumber ? pageNumber : 1;
            const skipPage = (page * countProductsPage) - countProductsPage;
            const productsFinded = await this.productsRepository.findProducts();
            const totalProductsPage = productsFinded.slice(skipPage, skipPage + countProductsPage);
            const totalPages = Math.ceil(productsFinded.length / countProductsPage);
            const productsPagination = {
                products: totalProductsPage,
                page: page,
                totalPages: totalPages,
                totalProducts: totalProductsPage.length
            };
            return productsPagination;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.ProductsService = ProductsService;
;
