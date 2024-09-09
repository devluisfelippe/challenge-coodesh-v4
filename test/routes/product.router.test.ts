import request from 'supertest';
import app from '../../src/app'; 
import { IProductsRepository, ProductsDatabase } from '../../src/domain/repositories/products.repository';
import { IProductEntity, StatusProduct } from '../../src/domain/entities/product.entity';

describe('Testing routes products', () => {
    const mockProduct: IProductEntity = {
        code: 20221126,
        status: StatusProduct.PUBLISHED,
        imported_t: "2020-02-07T16:00:00Z",
        url: "https://world.openfoodfacts.org/product/20221126",
        creator: "securita",
        created_t: 1415302075,
        last_modified_t: 1572265837,
        product_name: "Madalenas quadradas",
        quantity: "380 g (6 x 2 u.)",
        brands: "La Cestera",
        categories: "Lanches comida, Lanches doces, Biscoitos e Bolos, Bolos, Madalenas",
        labels: "Contem gluten, Contém derivados de ovos, Contém ovos",
        cities: "",
        purchase_places: "Braga,Portugal",
        stores: "Lidl",
        ingredients_text: "farinha de trigo, açúcar, óleo vegetal de girassol, clara de ovo, ovo, humidificante (sorbitol), levedantes químicos (difosfato dissódico, hidrogenocarbonato de sódio), xarope de glucose-frutose, sal, aroma",
        traces: "Frutos de casca rija,Leite,Soja,Sementes de sésamo,Produtos à base de sementes de sésamo",
        serving_size: "madalena 31.7 g",
        serving_quantity: 31.7,
        nutriscore_score: 17,
        nutriscore_grade: "d",
        main_category: "en:madeleines",
        image_url: "https://static.openfoodfacts.org/images/products/20221126/front_pt.5.400.jpg"
    };

    beforeEach(async () => {
        const productRepository: IProductsRepository = new ProductsDatabase();
        await productRepository.createProducts([mockProduct]);
    });

    afterEach(async () => {
        const productRepository: IProductsRepository = new ProductsDatabase();
        await productRepository.deleteProduct(mockProduct.code);
    });

    describe('GET /server_details', () => {
        it('Should return server details with status 200', async () => {
            const response = await request(app).get('/server_details');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('onlineTime');
            expect(response.body).toHaveProperty('memoryUsage');
            expect(response.body).toHaveProperty('dbConnection');
            expect(response.body).toHaveProperty('lastCronRun');
        });
    });

    describe('PUT /products/:code', () => {
        it('Should update a product and return status 201', async () => {
            const mockCode = mockProduct.code;
            const mockProductData = {};
            const response = await request(app)
                .put(`/products/${mockCode}`)
                .send(mockProductData);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
        });
    });

    describe('DELETE /products/:code', () => {
        it('Should delete a product and return status 201', async () => {
            const mockCode = mockProduct.code;
            const response = await request(app).delete(`/products/${mockCode}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
        });
    });

    describe('GET /products/:code', () => {
        it('Should return a product by code with status 200', async () => {
            const mockCode = mockProduct.code;
            const response = await request(app).get(`/products/${mockCode}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({});
        });
    });

    describe('GET /products', () => {
        it('Should return products with pagination and status 200', async () => {
            const response = await request(app).get('/products?page=1');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('products');
            expect(response.body).toHaveProperty('page');
            expect(response.body).toHaveProperty('totalPages');
            expect(response.body).toHaveProperty('totalProducts');
        });
    });
});