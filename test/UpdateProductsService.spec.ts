import { createConnection } from 'typeorm';
import UpdateProductsService from '../src/modules/Products/services/UpdateProductsService';
import AppErro from '../src/Error/AppError';

let updateProductsService: UpdateProductsService;

describe('UpdateProducts', () => {
  beforeAll(async () => {
    await createConnection();
    updateProductsService = new UpdateProductsService();

    await updateProductsService.execute([
      {
        id: '1',
        name: 'zezé',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await updateProductsService.execute([
      {
        id: '1',
        name: 'maradona',
        created_at: new Date('2020-05-05'),
        updated_at: new Date('2020-05-05'),
      },
    ]);
  });

  it('should be able to update one or multiple products', async () => {
    await expect.arrayContaining([
      {
        id: '1',
        name: 'maradona',
      },
    ]);
  });

  it('should not update unexisting products', async () => {
    await expect(
      updateProductsService.execute([
        {
          id: '18648',
          name: 'pedra',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]),
    ).rejects.toBeInstanceOf(AppErro);
  });

  it('should not not repeat the same request', async () => {
    await expect(
      updateProductsService.execute([
        {
          id: '1',
          name: 'maradona',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]),
    ).rejects.toBeInstanceOf(AppErro);
  });
});
