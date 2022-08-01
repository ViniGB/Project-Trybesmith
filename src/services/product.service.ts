import Joi from 'joi';
import connection from '../models/connection';
import ProductModel from '../models/product.model';
import Product from '../interfaces/product.interface';

export const productValidation = {
  async validateProductBody(data: Product): Promise<Product> {
    const schema = Joi.object<Product>({
      name: Joi.string().required().min(3).max(255),
      amount: Joi.string().required().min(3).max(255),
    });
  
    const result = await schema.validateAsync(data);
    return result;
  },
};

export default class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public createProduct(product: Product): Promise<Product> {
    return this.model.createProduct(product);
  }

  public async listProducts(): Promise<Product[]> {
    const products = await this.model.listProducts();
    return products;
  }
}