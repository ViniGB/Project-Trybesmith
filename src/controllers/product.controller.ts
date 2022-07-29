import { Request, Response } from 'express';
import ProductService from '../services/product.service';

export default class ProductController {
  constructor(private productService = new ProductService()) { }

  public createProduct = async (req: Request, res: Response) => {
    const product = req.body;

    const newProduct = await this.productService.createProduct(product);
    res.status(201).json(newProduct);
  };

  public listProducts = async (_req: Request, res: Response) => {
    const products = await this.productService.listProducts();
    res.status(200).json(products);
  };
}