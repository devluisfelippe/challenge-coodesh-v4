import { IProductEntity, Product, StatusProduct } from "../../domain/entities/product.entity";
import { IProductsRepository } from "../../domain/repositories/products.repository";
import ApiOpenFoodFacts from "../../infra/api/apiOpenFoodFacts";
import { databaseConnected } from "../../infra/db/db.config";
import dateConverter from "../../utils/dateConverter";

interface IProductsService {
    findServerDetails(): Promise<object>
    insertProducts(): Promise<void>
    updateProduct(_code: string, productData): Promise<number>
    deleteProduct(_code: string): Promise<number>
    findProductByCode(_code: string): Promise<object>
    findProducts(): Promise<[]>
}

class ProductsService implements IProductsService {
    private apiOpenFoodFacts;
    constructor(private productsRepository: IProductsRepository) {
        this.apiOpenFoodFacts = new ApiOpenFoodFacts();
    }

    async findServerDetails(): Promise<object> {
        try {
            const onlineTime = process.uptime();
            const memoryUsage = process.memoryUsage();
            const { dbConnection } = await databaseConnected();
            const logCron = await this.productsRepository.findLastLog();
            const dateLogFormatted = await dateConverter(logCron.created_at);

            const serverDetails = {
                onlineTime: `${Math.floor(onlineTime / 3600)}h ${Math.floor(onlineTime / 60)}min ${Math.floor(onlineTime % 60)}s`,
                memoryUsage: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
                dbConnection,
                lastCronRun: dateLogFormatted
            };

            return serverDetails;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async insertProducts(): Promise<void> {
        try {
            const products: IProductEntity[] = await this.apiOpenFoodFacts.getProducts();
            await this.productsRepository.createProducts(products);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateProduct(_code: string, productData): Promise<number> {
        try {
            const productFinded = await this.productsRepository.findProductByCode(_code);
            const productUpdate = new Product(productFinded);
            productUpdate.updateStatus(productData);
            const productUpdated = await this.productsRepository.updateProduct(_code, productUpdate.getStatus());
            return productUpdated;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteProduct(_code: string): Promise<number> {
        try {
            const productFinded = await this.productsRepository.findProductByCode(_code);
            const productDelete = new Product(productFinded);
            productDelete.updateStatus(StatusProduct.TRASH);
            const productDeteled = await this.productsRepository.updateProduct(_code, productDelete.getStatus());
            return productDeteled;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async findProductByCode(_code: string): Promise<object> {
        try {
            const productFinded = await this.productsRepository.findProductByCode(_code);
            return productFinded;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async findProducts(): Promise<[]> {
        return [];
    }
};

export { IProductsService, ProductsService };