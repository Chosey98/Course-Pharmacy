import { Router } from 'express';
import * as OrdersService from '../services/orders/index.js';
import JoiMiddleware from '../helpers/middlewares/joiMiddleware.js';
import createOrderSchema from '../helpers/schemas/create-order.schema.js';
import authenticateWithJWT from '../helpers/functions/authenticateWithJWT.js';
const ordersRouter = Router();

ordersRouter.get('/me', authenticateWithJWT, OrdersService.getUserOrders);
ordersRouter.post(
	'/',
	authenticateWithJWT,
	JoiMiddleware(createOrderSchema),
	OrdersService.createOrder,
);

export default ordersRouter;
