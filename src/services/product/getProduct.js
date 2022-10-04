import {
    prisma
} from '../../index.js';
import { okResponse }
from '../../helpers/functions/ResponseHandler.js';
export async function getProduct(req, res, next) {
    try {
        // const products = Product.map((p) => {
        //     const category = Category.find((c) => c.id == p.catId);
        //     const product = {
        //         ...p,
        //         category,
        //     };
        //     delete product.catId;
        //     return product;
        // });
        const products = await prisma.products.findMany({
            select: {
                id: true,
                name: true,
                quantity: true,
                price: true,
                category: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        });
        return okResponse(res, 'All Products Found succesfully', products);
    } catch (err) {
        next(err);
    }
}