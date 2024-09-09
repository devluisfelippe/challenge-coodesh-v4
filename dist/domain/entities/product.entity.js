"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusProduct = exports.Product = void 0;
var StatusProduct;
(function (StatusProduct) {
    StatusProduct["DRAFT"] = "DRAFT";
    StatusProduct["TRASH"] = "TRASH";
    StatusProduct["PUBLISHED"] = "PUBLISHED";
})(StatusProduct || (exports.StatusProduct = StatusProduct = {}));
class Product {
    code;
    status;
    imported_t;
    url;
    creator;
    created_t;
    last_modified_t;
    product_name;
    quantity;
    brands;
    categories;
    labels;
    cities;
    purchase_places;
    stores;
    ingredients_text;
    traces;
    serving_size;
    serving_quantity;
    nutriscore_score;
    nutriscore_grade;
    main_category;
    image_url;
    constructor(product) {
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
    updateStatus(status) {
        this.status = status;
    }
    getStatus() {
        return this.status;
    }
}
exports.Product = Product;
