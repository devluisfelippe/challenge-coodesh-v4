import { databaseConnected } from "../db/db.config";
import { IProductsRepository } from "../repositories/products.repository";
import dateConverter from "../utils/dateConverter";

interface IProductsService {
    findServerDetails(): Promise<object>
    updateStatusProduct(): Promise<string>
    deleteProduct(): Promise<string>
    findProductByCode(): Promise<object>
    findProducts(): Promise<[]>
}

class ProductsService implements IProductsService {
    constructor(private productsRepository: IProductsRepository) { }

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

    async updateStatusProduct(): Promise<string> { return ""; }
    async deleteProduct(): Promise<string> { return ""; }
    async findProductByCode(): Promise<object> { return {}; }
    async findProducts(): Promise<[]> { return []; }
};

export { IProductsService, ProductsService };