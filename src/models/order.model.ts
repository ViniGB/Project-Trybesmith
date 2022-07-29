import { Pool } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async listOrders(): Promise<Order[]> {
    const result = await this.connection.execute(
      `
      SELECT 
        Orders.id, Orders.userId, JSON_ARRAYAGG(Products.id) as productsIds
      FROM Trybesmith.Products as Products
      INNER JOIN Trybesmith.Orders as Orders
      ON Products.orderId = Orders.id
      GROUP BY Orders.id
      ORDER BY Orders.userId
      `,
    );
    const [rows] = result;
    return rows as Order[];
  }
}