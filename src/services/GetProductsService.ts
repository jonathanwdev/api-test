import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../repository/ProductsRepository';
import Product from '../models/Product';

class GetProductsService {
  public async execute(): Promise<Product[] | null> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const products = await productsRepository.find();
    return products;
  }
}

export default GetProductsService;
