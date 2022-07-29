import { Request, Response } from 'express';
import ProductService from '../services/product.service';

export default class ProductController {
  constructor(private productService = new ProductService()) { }

  public createProduct = async (req: Request, res: Response) => {
    const product = req.body;

    const newProduct = await this.productService.createProduct(product);
    res.status(201).json(newProduct);
  };
}