const { Segments, Joi } = require('celebrate');

const riskValidator = new Object();


riskValidator.create = {
    [Segments.BODY]: Joi.object().keys({
        description: Joi.string().required(),
    })
}

riskValidator.get = {
    [Segments.QUERY]: Joi.object().keys({
        risk_id: Joi.string().optional(),
    })
}

riskValidator.update = {
    [Segments.PARAMS]: Joi.object().keys({
        risk_id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
        description: Joi.string().optional(),
    })
}

riskValidator.delete = {
    [Segments.PARAMS]: Joi.object().keys({
        risk_id: Joi.string().required(),
    })
}

module.exports = riskValidator;