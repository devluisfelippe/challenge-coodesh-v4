"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_router_1 = __importDefault(require("./infra/routes/product.router"));
require("dotenv/config");
require("./infra/db/db.config");
require("./application/cron/cron.service");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(product_router_1.default);
exports.default = app;
