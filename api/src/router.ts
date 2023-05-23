import {Router} from 'express';
import path from 'node:path';
import multer from 'multer';
import { createCategory } from './app/useCases/categories/createCategory';
import { listCategories } from './app/useCases/categories/listCategories';
import { createProduct } from './app/useCases/products/createProducts';
import { listProducts } from './app/useCases/products/listProducts';
import { listProductByCategory } from './app/useCases/categories/listProductByCategory';
import { listOrders } from './app/useCases/orders/listOrders';
import { createOrders } from './app/useCases/orders/createOrders';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { deleteOrders } from './app/useCases/orders/deleteOrders';
import { deleteCategory } from './app/useCases/categories/deleteCategory';
import { deleteProducts } from './app/useCases/products/deleteProducts';

export const router = Router();
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null,path.resolve(__dirname,'..','uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    }
  })
}
);
//LIST CATEGORIES
router.get('/categories', listCategories);

//CREATE CATEGORY
router.post('/categories',  createCategory);

//Delete CATEGORY
router.delete('/categories/:CategoryId', deleteCategory);

//List products
router.get('/products', listProducts);

//Create product
router.post('/products', upload.single('image'),createProduct);

//Delete product
router.delete('/products/:productId', deleteProducts);


//Get products by category
router.get('/categories/:categoryId/products', listProductByCategory);

//List orders
router.get('/orders', listOrders);

//Create order
router.post('/orders', createOrders);

//Change order status
router.patch('/orders/:orderId', changeOrderStatus);

//Delete/cancel order
router.delete('/orders/:orderId', deleteOrders);
