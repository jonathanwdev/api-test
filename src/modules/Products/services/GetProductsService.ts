import { getRepository } from 'typeorm';
import Product from '../models/Product';

class GetProductsService {
  public async execute(): Promise<Product[] | null> {
    const productsRepository = getRepository(Product);
    const products = await productsRepository.find();
    return products;
  }
}

export default GetProductsService;
