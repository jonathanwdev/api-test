import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../repository/ProductsRepository';
import Product from '../models/Product';
import RedisProvider from '../../../shared/RedisProvider/implementations/RedisProvider';

interface IData {
  id: string;
  name: string;
}

class UpdateProductsService {
  private redis: RedisProvider;

  constructor() {
    this.redis = new RedisProvider();
  }

  public async execute(data: IData[]): Promise<Product[] | null> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const compareLastUpdate = await this.redis.recover<Product[]>(
      'products_list:fake_user',
    );

    const ids = data.filter(dataId => dataId.id);
    const products = await productsRepository.findByIds(ids);

    products.forEach(async product => {
      const newProduct = data.find(eachItem => eachItem.id === product.id);
      if (newProduct) {
        product.name = newProduct.name;
        await productsRepository.save(product);
      }
    });
    // await this.redis.save('products_list:fake_user', products);

    return products;
  }
}

export default UpdateProductsService;
