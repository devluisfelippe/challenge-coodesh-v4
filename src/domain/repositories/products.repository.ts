import { Document } from "mongodb";
import { db } from "../../infra/db/db.config";
import { IProductEntity } from "../entities/product.entity";

interface IProductsRepository {
    findLastLog(): Promise<Document>
    createProducts(products: IProductEntity[]): Promise<void>
    updateProduct(_code: string, status: string): Promise<number>
    findProductByCode(_code: string)
    findProducts(): Promise<Document>,
    deleteProduct(_code): Promise<number>
}

class ProductsDatabase implements IProductsRepository {
    private productsCollection = db.collection("products");
    private logsCollection = db.collection("logs");

    async findLastLog(): Promise<Document> {
        try {
            const logs = await this.logsCollection.find().sort({ created_at: -1 }).toArray();
            return logs[0];
        } catch (error) {
            throw new Error(error.message);
        }
    }

    private async createLogs(status_import: string): Promise<boolean> {
        try {
            const logCreated = await this.logsCollection.insertOne({
                created_at: new Date(),
                status_import
            });
            return logCreated.acknowledged;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createProducts(products: IProductEntity[]): Promise<void> {
        try {
            const productsFinded = await this.findProducts();
            products.forEach(async (product) => {
                const productExists = productsFinded.find((productExist: IProductEntity) => product.code === productExist.code);
                if (!productExists) {
                    await this.productsCollection.insertOne(product);
                }
            });
            await this.createLogs("OK");
        } catch (error) {
            await this.createLogs("FAILED");
        }
    }

    async updateProduct(_code: string, status: string): Promise<number> {
        try {
            const productUpdated = await this.productsCollection.updateOne(
                { "code": _code },
                { $set: { status: status } }
            );
            return productUpdated.modifiedCount;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async findProductByCode(_code: string): Promise<Document | undefined> {
        try {
            const product = await this.productsCollection.findOne({ code: _code });
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async findProducts(): Promise<Document> {
        try {
            const products = await this.productsCollection.find().toArray();
            return products;
        } catch (error) {
            throw new Error(error.message);
        };
    }

    async deleteProduct(_code): Promise<number> {
        try {
            const productDeleted = await this.productsCollection.deleteOne({ code: _code });
            return productDeleted.deletedCount;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export { IProductsRepository, ProductsDatabase };