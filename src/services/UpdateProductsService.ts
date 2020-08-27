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

    products.forEach(async product => {
      const newProduct = data.find(eachItem => eachItem.id === product.id);
      if (newProduct) {
        product.name = newProduct.name;
        await productsRepository.save(product);
      }
    });

    return products;
  }
}

export default UpdateProductsService;
