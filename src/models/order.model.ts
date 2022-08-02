import { Pool, ResultSetHeader } from 'mysql2/promise';
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

  public async createOrder(order: Order): Promise<Order> {
    const { userId } = order;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userId],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...order };
  }

  public async updateProducts(id: number, order: Order) {
    await this.connection.execute(
      'UPDATE Trybesmith.Products SET orderId=? WHERE id=?',
      [order.id, id],
    );
  }
}