import Joi from "joi";
import BaseDto from "../../../common/validation/validation.dto";

class TodoDto extends BaseDto {
    static schema = Joi.object({
        title: Joi.string(),
        description: Joi.string()
    })
}
