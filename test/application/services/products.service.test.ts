import { ProductsService } from '../../../src/application/services/products.service';
import { IProductsRepository } from '../../../src/domain/repositories/products.repository';
import { IProductEntity, Product, StatusProduct } from '../../../src/domain/entities/product.entity';
import ApiOpenFoodFacts from '../../../src/infra/api/apiOpenFoodFacts';
import dateConverter from '../../../src/utils/dateConverter';

describe('ProductsService', () => {
    let productsService: ProductsService;
    const mockProductsRepository: IProductsRepository = {
        findLastLog: jest.fn(),
        createProducts: jest.fn(),
        findProductByCode: jest.fn(),
        updateProduct: jest.fn(),
        findProducts: jest.fn(),
        deleteProduct: jest.fn()
    };

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

    beforeEach(() => {
        productsService = new ProductsService(mockProductsRepository);
    });

    describe('findServerDetails', () => {
        it('Should return server details', async () => {
            const fakeDate = new Date();
            jest.spyOn(process, 'uptime').mockReturnValue(3600);
            jest.spyOn(process, 'memoryUsage').mockReturnValue({
                rss: 1048576,
                heapTotal: 2048,
                heapUsed: 1024,
                external: 512,
                arrayBuffers: 256
            });

            const mockDatabaseConnected = jest.fn().mockResolvedValue({ dbConnection: 'OK' });
            const mockDateConverter = jest.fn().mockResolvedValue(fakeDate.toISOString());

            jest.mock('../../../src/infra/db/db.config', () => ({
                databaseConnected: mockDatabaseConnected
            }));

            jest.mock('../../../src/utils/dateConverter', () => ({
                dateConverter: mockDateConverter
            }));


            mockProductsRepository.findLastLog = jest.fn().mockResolvedValue({ created_at: fakeDate });

            const serverDetails = await productsService.findServerDetails();
            expect(serverDetails).toEqual({
                onlineTime: '1h 0min 0s',
                memoryUsage: '1.00 MB',
                dbConnection: 'OK',
                lastCronRun: await dateConverter(fakeDate),
            });
        });
    });

    describe('insertProducts', () => {
        it('Should insert products', async () => {
            const mockProducts: IProductEntity[] = [mockProduct];
            jest.spyOn(ApiOpenFoodFacts.prototype, 'getProducts').mockResolvedValue(mockProducts);

            await productsService.insertProducts();

            expect(mockProductsRepository.createProducts).toHaveBeenCalledWith(mockProducts);
        });
    });

    describe('updateProduct', () => {
        it('Should update a product', async () => {
            const mockCode = '20221126';
            const mockProductData = { };
            const mockProductInstance = new Product(mockProduct);

            mockProductsRepository.findProductByCode = jest.fn().mockResolvedValue(mockProductInstance);
            mockProductsRepository.updateProduct = jest.fn().mockResolvedValue(1);

            const result = await productsService.updateProduct(mockCode, mockProductData);

            expect(mockProductsRepository.updateProduct).toHaveBeenCalledWith(mockCode, {});
            expect(result).toBe(1);
        });
    });

    describe('deleteProduct', () => {
        it('Should delete a product', async () => {
            const mockCode = '20221126';
            const mockProductInstance = new Product(mockProduct);

            mockProductsRepository.findProductByCode = jest.fn().mockResolvedValue(mockProductInstance);
            mockProductsRepository.updateProduct = jest.fn().mockResolvedValue(1);

            const result = await productsService.deleteProduct(mockCode);

            expect(mockProductsRepository.updateProduct).toHaveBeenCalledWith(mockCode, StatusProduct.TRASH);
            expect(result).toBe(1);
        });
    });

    describe('findProductByCode', () => {
        it('Should find a product by code', async () => {
            const mockCode = '20221126';

            mockProductsRepository.findProductByCode = jest.fn().mockResolvedValue(mockProduct);

            const result = await productsService.findProductByCode(mockCode);

            expect(result).toEqual(mockProduct);
        });
    });

    describe('findProducts', () => {
        it('Should find products with pagination', async () => {
            const mockProducts = [mockProduct, mockProduct, mockProduct];
            mockProductsRepository.findProducts = jest.fn().mockResolvedValue(mockProducts);

            const result = await productsService.findProducts(1);

            expect(result).toEqual({
                products: mockProducts.slice(0, 10),
                page: 1,
                totalPages: 1,
                totalProducts: mockProducts.length
            });
        });
    });
});
