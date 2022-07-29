import connection from '../models/connection';
import OrderModel from '../models/order.model';
import Order from '../interfaces/order.interface';

export default class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async listOrders(): Promise<Order[]> {
    const orders = await this.model.listOrders();
    return orders;
  }
}