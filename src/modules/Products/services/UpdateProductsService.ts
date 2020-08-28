import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../repository/ProductsRepository';
import Product from '../models/Product';
import RedisProvider from '../../../shared/RedisProvider/implementations/RedisProvider';
import CompareBodies from '../../../Utils/CompareBodies';
import AppError from '../../../Error/AppError';

class UpdateProductsService {
  private redis: RedisProvider;

  constructor() {
    this.redis = new RedisProvider();
  }

  public async execute(data: Product[]): Promise<Product[] | null> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const rememberLastUpdate = await this.redis.recover<Product[]>(
      'products_list:fake_user',
    );

    if (rememberLastUpdate) {
      if (!CompareBodies(data, rememberLastUpdate)) {
        throw new AppError('Error', 401);
      }
      console.log(CompareBodies(data, rememberLastUpdate));
    }

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
