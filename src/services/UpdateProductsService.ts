import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../repository/ProductsRepository';
import Product from '../models/Product';

interface IData {
  id: string;
  name: string;
}

class UpdateProductsService {
  public async execute(data: IData[]): Promise<Product[] | null> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const ids = data.filter(dataId => dataId.id);

    const products = await productsRepository.findByIds(ids);

    return products;
  }
}

export default UpdateProductsService;
