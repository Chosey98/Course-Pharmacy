import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import logger from './helpers/middlewares/logger.js';
import errorHandler from './helpers/middlewares/errorHandler.js';
import authRouter from './controllers/auth.controller.js';
import ordersRouter from './controllers/orders.controller.js';
import registerStrategies from './helpers/functions/registerStrategies.js';
import productsRouter from './controllers/products.controller.js';
import { CronJob } from 'cron';
const prisma = new PrismaClient();
dotenv.config();

const app = express();
registerStrategies();

// -- Middlewares --
app.use(express.json());
app.use(logger);
// -- Routes --
app.use('/auth', authRouter);
app.use('/orders', ordersRouter);
app.use('/products', productsRouter);

app.use(errorHandler);

const checkForExpiredTokens = new CronJob('*/5 * * * * *', async () => {
	console.log('Checking for expired tokens...');
	const expiredTokens = await prisma.tokens.findMany({
		where: {
			expiresAt: {
				lte: new Date(),
			},
		},
	});
	if (expiredTokens.length > 0) {
		console.log(`Found ${expiredTokens.length} expired tokens`);
		for (const token of expiredTokens) {
			await prisma.tokens.delete({
				where: {
					id: token.id,
				},
			});
		}
		console.log('Deleted expired tokens');
	} else {
		console.log('No expired tokens found');
	}
});

app.listen(process.env.PORT, () => {
	console.log(`Server is listening on port ${process.env.PORT}`);
	checkForExpiredTokens.start();
});

export { prisma };
