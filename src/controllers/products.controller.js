import { Router } from 'express';

import * as ProductsService from '../services/products/index.js';

const productsRouter = Router();

productsRouter.get('/', ProductsService.getProducts);
productsRouter.get('/:id', ProductsService.getProductById);

export default productsRouter;
