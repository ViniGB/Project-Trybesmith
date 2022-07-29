import { Router } from 'express';
import ProductController from '../controllers/product.controller';

const router = Router();

const productController = new ProductController();

router.post('/products', productController.createProduct);

router.get('/products', productController.listProducts);

export default router;