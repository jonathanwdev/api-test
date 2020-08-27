import { Request, Response } from 'express';
import GetProductsService from '../services/GetProductsService';
import UpdateProductsService from '../services/UpdateProductsService';

const getProductsService = new GetProductsService();
const updateProductsService = new UpdateProductsService();

class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const products = await getProductsService.execute();
    return response.json(products);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { data } = request.body;
    const updatedProducts = await updateProductsService.execute(data);
    return response.json(updatedProducts);
  }
}

export default ProductsController;
