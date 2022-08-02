import Joi from 'joi';
import connection from '../models/connection';
import OrderModel from '../models/order.model';
import Order from '../interfaces/order.interface';

interface ProductsIds {
  productsIds: number[],
}

export const productsIdsValidation = {
  async validateProductsIds(data: ProductsIds) {
    const schema = Joi.object<ProductsIds>({
      productsIds: Joi.array()
        .min(1)
        .items(Joi.number())
        .strict()
        .required()
        .messages({
          'array.min': '"productsIds" must include only numbers',
        }),
    });

    const result = await schema.validateAsync(data);
    return result;
  },
};

export default class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async listOrders(): Promise<Order[]> {
    const orders = await this.model.listOrders();
    return orders;
  }

  public async createOrder(order: Order): Promise<Order> {
    return this.model.createOrder(order);
  }

  public async updateProducts(id: number, order: Order) {
    return this.model.updateProducts(id, order);
  }
}