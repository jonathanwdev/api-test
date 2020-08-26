import { Request, Response } from 'express';
import GetProductsService from '../services/GetProductsService';

const getProductsService = new GetProductsService();

class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const products = await getProductsService.execute();
    return response.json(products);
  }
}

export default ProductsController;
