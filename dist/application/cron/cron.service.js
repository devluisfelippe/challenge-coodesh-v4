"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const products_service_1 = require("../services/products.service");
const products_repository_1 = require("../../domain/repositories/products.repository");
const productRepository = new products_repository_1.ProductsDatabase();
const productService = new products_service_1.ProductsService(productRepository);
node_cron_1.default.schedule('0 3 * * *', async () => { await productService.insertProducts(); }, { scheduled: true, timezone: 'America/Sao_Paulo' });
