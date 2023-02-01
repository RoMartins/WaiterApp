"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const node_path_1 = __importDefault(require("node:path"));
const multer_1 = __importDefault(require("multer"));
const createCategory_1 = require("./app/useCases/categories/createCategory");
const listCategories_1 = require("./app/useCases/categories/listCategories");
const createProducts_1 = require("./app/useCases/products/createProducts");
const listProducts_1 = require("./app/useCases/products/listProducts");
const listProductByCategory_1 = require("./app/useCases/categories/listProductByCategory");
const listOrders_1 = require("./app/useCases/orders/listOrders");
const createOrders_1 = require("./app/useCases/orders/createOrders");
const changeOrderStatus_1 = require("./app/useCases/orders/changeOrderStatus");
const deleteOrders_1 = require("./app/useCases/orders/deleteOrders");
const deleteCategory_1 = require("./app/useCases/categories/deleteCategory");
const deleteProducts_1 = require("./app/useCases/products/deleteProducts");
exports.router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination(req, file, callback) {
            callback(null, node_path_1.default.resolve(__dirname, '..', 'uploads'));
        },
        filename(req, file, callback) {
            callback(null, `${Date.now()}-${file.originalname}`);
        }
    })
});
//LIST CATEGORIES
exports.router.get('/categories', listCategories_1.listCategories);
//CREATE CATEGORY
exports.router.post('/categories', createCategory_1.createCategory);
//CREATE CATEGORY
exports.router.delete('/categories/:CategoryId', deleteCategory_1.deleteCategory);
//List products
exports.router.get('/products', listProducts_1.listProducts);
//Create product
exports.router.post('/products', upload.single('image'), createProducts_1.createProduct);
//Delete product
exports.router.delete('/products/:productId', deleteProducts_1.deleteProducts);
//Get products by category
exports.router.get('/categories/:categoryId/products', listProductByCategory_1.listProductByCategory);
//List orders
exports.router.get('/orders', listOrders_1.listOrders);
//Create order
exports.router.post('/orders', createOrders_1.createOrders);
//Change order status
exports.router.patch('/orders/:orderId', changeOrderStatus_1.changeOrderStatus);
//Delete/cancel order
exports.router.delete('/orders/:orderId', deleteOrders_1.deleteOrders);
