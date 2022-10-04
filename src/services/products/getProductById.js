import {
	badRequestResponse,
	okResponse,
} from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';

export async function getProductById(req, res, next) {
	try {
		const { id } = req.params;
		if (isNaN(Number(id))) {
			return badRequestResponse(res, 'Invalid product id');
		}
		const product = await prisma.products.findUnique({
			where: {
				id: parseInt(id),
			},
			select: {
				id: true,
				name: true,
				price: true,
				quantity: true,
				category: true,
			},
		});
		return okResponse(res, 'Product fetched successfully', product);
	} catch (err) {
		next(err);
	}
}
