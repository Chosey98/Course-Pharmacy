import { prisma } from '../../index.js';
import { badRequestResponse } from '../../helpers/functions/ResponseHandler.js';
import { okResponse } from '../../helpers/functions/ResponseHandler.js';
export async function createProduct(req, res) {
    try {
        let { role } = req.user;
        let { name, quantity, catId } = req.body;
        const categoryId = await prisma.category.findUnique({
            where: {
                id: parseInt(catId),
            }
        });
        if (!name || !quantity || !catId) {
            return badRequestResponse(res, 'Please fill all fields');
        }
        if (!categoryId) {
            return badRequestResponse(res, 'Category not found');
        }
        if (role !== 'admin') {
            return badRequestResponse(res, 'You are not authorized to create a product');
        }
        const product = await prisma.product.create({
            data: {
                name,
                quantity,
                categoryId: parseInt(catId),
            }
        });
        if (!product) {
            return badRequestResponse(res, 'Product not created');
        }
        return okResponse(res, 'Product created successfully', product);
    } catch (err) {
        return badRequestResponse(res, err.message);
    }
}