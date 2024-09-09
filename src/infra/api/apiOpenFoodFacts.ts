import axios from "axios";
import fs from "fs";
import path from "path";
import * as _ from "lodash";
import unzipFileProducts from "../../utils/unzipFileProducts";
import { IProductEntity } from "../../domain/entities/product.entity";

class ApiOpenFoodFacts {
    private async getIndexProductsOpenFoodFacts(): Promise<string> {
        try {
            const indexProducts = await axios.get("https://challenges.coode.sh/food/data/json/index.txt").then((response) => {
                return response.data;
            });

            return indexProducts;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    private async getFilesProductsOpenFoodFacts(indexProduct: string): Promise<string[]> {
        try {
            const productsDownload = await axios.get(
                `https://challenges.coode.sh/food/data/json/${indexProduct}`,
                { method: 'GET', responseType: 'stream' }
            );

            const dirnameFileProductsZip = path.resolve(__dirname, '../documents', indexProduct);

            fs.mkdirSync(path.dirname(dirnameFileProductsZip), { recursive: true });
            const writerStream = fs.createWriteStream(dirnameFileProductsZip);
            productsDownload.data.pipe(writerStream);
            const products = await new Promise<string[]>((resolve, reject) => {
                writerStream.on('finish', async () => {
                    try {
                        const products = await unzipFileProducts(dirnameFileProductsZip);
                        resolve(products);
                    } catch (error) {
                        reject(error.message);
                    }
                });

                writerStream.on('error', (error) => {
                    reject(error);
                });
            });
            return products;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    async getProducts(): Promise<IProductEntity[]> {
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
            })
            );

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
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default ApiOpenFoodFacts;