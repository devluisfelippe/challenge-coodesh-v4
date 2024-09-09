import cron from "node-cron";
import { ProductsService } from "../services/products.service";
import { IProductsRepository, ProductsDatabase } from "../../domain/repositories/products.repository";

const productRepository: IProductsRepository = new ProductsDatabase();
const productService = new ProductsService(productRepository);

cron.schedule(
    '0 3 * * *',
    async () => { await productService.insertProducts(); },
    { scheduled: true, timezone: 'America/Sao_Paulo' }
);