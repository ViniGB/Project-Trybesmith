import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import OrderService, { productsIdsValidation } from '../services/order.service';
import { LoginService } from '../services/login.service';

const secret: string = process.env.JWT_SECRET || 'my_secret';

const loginService = new LoginService();

export default class OrderController {
  constructor(private orderService = new OrderService()) { }

  public listOrders = async (_req: Request, res: Response) => {
    const orders = await this.orderService.listOrders();
    res.status(200).json(orders);
  };

  public createOrder = async (req: Request, res: Response) => {
    const token = req.headers.authorization || '';
    const data = req.body;

    await productsIdsValidation.validateProductsIds(data);
    
    const decoded: any = jwt.verify(token, secret);
    const user = await loginService.validateUser(decoded.data.username);

    const order = { userId: user.id };
    const newOrder = await this.orderService.createOrder(order);
    await Promise.all(data.productsIds
      .map((id: number) => this.orderService.updateProducts(id, newOrder)));

    res.status(201).json({ userId: user.id, productsIds: data.productsIds });
  };
}