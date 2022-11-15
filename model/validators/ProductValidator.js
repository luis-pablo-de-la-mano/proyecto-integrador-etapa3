import Joi from "joi";


class ProductValidator {
    
    static validate(product) {

        const productSchema = Joi.object({
            id: Joi.string().min(0).max(24).required(), // esto lo agregue. y con type_file se agregan, pero no modifican
            name: Joi.string().min(3).max(20).required(),
            price: Joi.number().required(),
            description: Joi.string().required(),
            category: Joi.string().required(), //nuevo mas o menos
            stock: Joi.number().required(), //nuevo
            brand: Joi.string().required(), //nuevo
            image: Joi.string().required() //nuevo
        });

        const { error } = productSchema.validate(product);

        return error;
    }
}

export default ProductValidator;
