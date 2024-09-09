"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsDatabase = void 0;
const db_config_1 = require("../../infra/db/db.config");
class ProductsDatabase {
    productsCollection = db_config_1.db.collection("products");
    logsCollection = db_config_1.db.collection("logs");
    async findLastLog() {
        try {
            const logs = await this.logsCollection.find().sort({ created_at: -1 }).toArray();
            return logs[0];
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async createLogs(status_import) {
        try {
            const logCreated = await this.logsCollection.insertOne({
                created_at: new Date(),
                status_import
            });
            return logCreated.acknowledged;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async createProducts(products) {
        try {
            const productsFinded = await this.findProducts();
            products.forEach(async (product) => {
                const productExists = productsFinded.find((productExist) => product.code === productExist.code);
                if (!productExists) {
                    await this.productsCollection.insertOne(product);
                }
            });
            await this.createLogs("OK");
        }
        catch (error) {
            await this.createLogs("FAILED");
        }
    }
    async updateProduct(_code, status) {
        try {
            const productUpdated = await this.productsCollection.updateOne({ "code": _code }, { $set: { status: status } });
            return productUpdated.modifiedCount;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async findProductByCode(_code) {
        try {
            const product = await this.productsCollection.findOne({ code: _code });
            return product;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async findProducts() {
        try {
            const products = await this.productsCollection.find().toArray();
            return products;
        }
        catch (error) {
            throw new Error(error.message);
        }
        ;
    }
    async deleteProduct(_code) {
        try {
            const productDeleted = await this.productsCollection.deleteOne({ code: _code });
            return productDeleted.deletedCount;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.ProductsDatabase = ProductsDatabase;
