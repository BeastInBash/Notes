import Joi from "joi";
import BaseDto from "../../../common/validation/validation.dto.js";

class RegisterDto extends BaseDto {
    static schema = Joi.object({
        name: Joi.string().trim().min(2).max(50).required(),
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(6).max(10).required(),
        role: Joi.string().valid("user", "dealer").default("user"),
    })
}

export default RegisterDto
