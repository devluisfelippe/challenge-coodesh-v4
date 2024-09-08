import * as yup from "yup";

class ProductDto {
    static schema = yup.object().shape({
        status: yup.string().oneOf(["TRASH", "PUBLISHED", "DRAFT"]).required("O status precisar ser TRASH, PUBLISHED ou DRAFT")
    });

    static async validate(data) {
        try {
            return await ProductDto.schema.validate(data, { abortEarly: false });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default ProductDto;