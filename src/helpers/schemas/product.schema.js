import Joi from 'joi';
const productSchema = Joi.object({
    quantity: Joi.number().greater(0).required().messages({
        'number.base': 'Quantity must be a number',
        'number.greater': 'Quantity must be greater than 0',
        'any.required': 'Quantity is required',
    }),
    name: Joi.string().min(5).max(32).required().messages({
        'string.min': 'Name must be at least 5 characters',
        'string.max': "Name can't be longer than 32 characters",
        'string.empty': "Name can't be empty",
        'any.required': 'Name is required',
    }),
    catId: Joi.number().required().messages({
        'number.base': 'Category must be a number',
        'any.required': 'Category is required',
    }),
});
export default productSchema;