import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';

const productsController = new ProductsController();
const routes = Router();

routes.get('/products', productsController.index);

export default routes;
