import { Document } from "mongodb";
import { db } from "../db/db.config";

interface IProductsRepository {
    findLastLog(): Promise<Document>
    createLogs(): Promise<string>
    updateStatusProduct(): Promise<string>
    deleteProduct(): Promise<string>
    findProductByCode(): Promise<object>
    findProducts(): Promise<[]>
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

    async createLogs(): Promise<string> {
        try {
            return "";
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateStatusProduct(): Promise<string> { return ""; }
    async deleteProduct(): Promise<string> { return ""; }
    async findProductByCode(): Promise<object> { return {}; }
    async findProducts(): Promise<[]> { return []; }
}

export { IProductsRepository, ProductsDatabase };