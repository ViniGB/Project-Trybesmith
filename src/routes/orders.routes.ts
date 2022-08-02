import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import authToken from '../middlewares/token.middleware';

const router = Router();

const orderController = new OrderController();

router.post('/orders', authToken.tokenValidation, orderController.createOrder);
router.get('/orders', orderController.listOrders);

export default router;