interface IProductEntity {
    code: number;
    status: StatusProduct;
    imported_t: string;
    url: string;
    creator: string;
    created_t: number;
    last_modified_t: number;
    product_name: string;
    quantity: string;
    brands: string;
    categories: string;
    labels: string;
    cities: string;
    purchase_places: string;
    stores: string;
    ingredients_text: string;
    traces: string;
    serving_size: string;
    serving_quantity: number;
    nutriscore_score: number;
    nutriscore_grade: string;
    main_category: string;
    image_url: string;
}

enum StatusProduct {
    DRAFT = "DRAFT", 
    TRASH = "TRASH",
    PUBLISHED = "PUBLISHED"
}

class Product {
    private code: number;
    private status: StatusProduct;
    private imported_t: Date;
    private url: string;
    private creator: string;
    private created_t: number;
    private last_modified_t: number;
    private product_name: string;
    private quantity: string;
    private brands: string;
    private categories: string;
    private labels: string;
    private cities: string;
    private purchase_places: string;
    private stores: string;
    private ingredients_text: string;
    private traces: string;
    private serving_size: string;
    private serving_quantity: number;
    private nutriscore_score: number;
    private nutriscore_grade: string;
    private main_category: string;
    private image_url: string;

    constructor(product: IProductEntity) {
        this.code = product.code;
        this.status = product.status;
        this.imported_t = new Date();
        this.url = product.url;
        this.creator = product.creator;
        this.created_t = product.created_t;
        this.last_modified_t = product.last_modified_t;
        this.product_name = product.product_name;
        this.quantity = product.quantity;
        this.brands = product.brands;
        this.categories = product.categories;
        this.labels = product.labels;
        this.cities = product.cities;
        this.purchase_places = product.purchase_places;
        this.stores = product.stores;
        this.ingredients_text = product.ingredients_text;
        this.traces = product.traces;
        this.serving_size = product.serving_size;
        this.serving_quantity = product.serving_quantity;
        this.nutriscore_score = product.nutriscore_score;
        this.nutriscore_grade = product.nutriscore_grade;
        this.main_category = product.main_category;
        this.image_url = product.image_url;
    }

    updateStatus(status: StatusProduct) {
        this.status = status;
    }

    getStatus() {
        return this.status;
    }
}

export { IProductEntity, Product, StatusProduct };