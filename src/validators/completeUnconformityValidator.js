const { Segments, Joi } = require('celebrate');

const completeUnconformityValidator = new Object();


completeUnconformityValidator.create = {
    [Segments.BODY]: Joi.object().keys({
        resolved_unconformity_id: Joi.string().required(),
        efficiency_evaluation: Joi.string().required(),
        risks: Joi.array().items(Joi.number().required()),
        norms: Joi.array().items(Joi.string().required()),
    })
}

completeUnconformityValidator.get = {
    [Segments.QUERY]: Joi.object().keys({
        resolved_unconformity_id: Joi.string().optional(),
        complete_unconformity_id: Joi.string().optional(),
    })
}

completeUnconformityValidator.update = {
    [Segments.PARAMS]: Joi.object().keys({
        resolved_unconformity_id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
        efficiency_evaluation: Joi.string().optional(),
    })
}

completeUnconformityValidator.delete = {
    [Segments.PARAMS]: Joi.object().keys({
        complete_unconformity_id: Joi.string().required(),
    })
}

module.exports = completeUnconformityValidator;