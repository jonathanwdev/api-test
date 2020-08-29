import { createConnection } from 'typeorm';
import GetProductsService from '../src/modules/Products/services/GetProductsService';

let getProductsService: GetProductsService;

describe('GetProducts', () => {
  beforeAll(async () => {
    await createConnection();
    getProductsService = new GetProductsService();
  });

  it('sould be able to request all products in db', async () => {
    await getProductsService.execute();
    expect.arrayContaining([
      { id: '', name: '', created_at: '', update_at: '' },
    ]);
  });
});
