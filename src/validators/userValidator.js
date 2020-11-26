const { Segments, Joi } = require('celebrate');

const userValidator = new Object();


userValidator.create = {
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        user_type: Joi.string().valid("manager", "employee").required(),
        password: Joi.string().required(),
    })
}

userValidator.getUsers = {
    [Segments.QUERY]: Joi.object().keys({
        name: Joi.string().optional(),
        email: Joi.string().optional(),
        user_type: Joi.string().valid("manager", "employee").optional(),
        firebase_uid: Joi.string().optional(),
        user_id: Joi.string().optional(),
    })
}

userValidator.delete = {
    [Segments.PARAMS]: Joi.object().keys({
        user_id: Joi.string().required(),
    })
}

module.exports = userValidator;