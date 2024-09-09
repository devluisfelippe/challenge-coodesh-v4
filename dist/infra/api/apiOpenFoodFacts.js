"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const _ = __importStar(require("lodash"));
const unzipFileProducts_1 = __importDefault(require("../../utils/unzipFileProducts"));
class ApiOpenFoodFacts {
    async getIndexProductsOpenFoodFacts() {
        try {
            const indexProducts = await axios_1.default.get("https://challenges.coode.sh/food/data/json/index.txt").then((response) => {
                return response.data;
            });
            return indexProducts;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    ;
    async getFilesProductsOpenFoodFacts(indexProduct) {
        try {
            const productsDownload = await axios_1.default.get(`https://challenges.coode.sh/food/data/json/${indexProduct}`, { method: 'GET', responseType: 'stream' });
            const dirnameFileProductsZip = path_1.default.resolve(__dirname, '../documents', indexProduct);
            fs_1.default.mkdirSync(path_1.default.dirname(dirnameFileProductsZip), { recursive: true });
            const writerStream = fs_1.default.createWriteStream(dirnameFileProductsZip);
            productsDownload.data.pipe(writerStream);
            const products = await new Promise((resolve, reject) => {
                writerStream.on('finish', async () => {
                    try {
                        const products = await (0, unzipFileProducts_1.default)(dirnameFileProductsZip);
                        resolve(products);
                    }
                    catch (error) {
                        reject(error.message);
                    }
                });
                writerStream.on('error', (error) => {
                    reject(error);
                });
            });
            return products;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    ;
    async getProducts() {
        try {
            const indexProducts = await this.getIndexProductsOpenFoodFacts().then((data) => { return data.trim().split('\n'); });
            const productsObject = [];
            await Promise.all(indexProducts.map(async (indexProduct) => {
                const documentProducts = await this.getFilesProductsOpenFoodFacts(indexProduct);
                documentProducts.forEach((product) => {
                    const cleanProduct = product
                        .replace(/\\n/g, '')
                        .replace(/\\t/g, '')
                        .trim();
                    const productConvert = JSON.parse(cleanProduct);
                    productsObject.push(productConvert);
                });
            }));
            const products = productsObject.map((product) => {
                const extractProductFields = _.pick(product, [
                    'code', 'status', 'imported_t', 'url', 'creator', 'created_t',
                    'last_modified_t', 'product_name', 'quantity', 'brands', 'categories', 'labels',
                    'cities', 'purchase_places', 'stores', 'ingredients_text', 'traces', 'serving_size',
                    'serving_quantity', 'nutriscore_score', 'nutriscore_grade', 'main_category', 'image_url'
                ]);
                return extractProductFields;
            });
            return products;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.default = ApiOpenFoodFacts;
