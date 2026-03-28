import Joi from "joi"
import BaseDto from "../../../common/validation/validation.dto.js";
class LoginDto extends BaseDto {
    static schema = Joi.object({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(6).max(10).required()
    })
}
export default LoginDto
