import { okResponse } from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
export async function getProducts(req, res, next) {
	try {
		const products = await prisma.products.findMany({
			select: {
				id: true,
				name: true,
				price: true,
				quantity: true,
				category: true,
			},
		});
		return okResponse(res, 'Products fetched successfully', products);
	} catch (err) {
		next(err);
	}
}
