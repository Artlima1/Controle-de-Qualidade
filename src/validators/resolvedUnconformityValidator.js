const { Segments, Joi } = require('celebrate');

const resolvedUnconformityValidator = new Object();


resolvedUnconformityValidator.create = {
    [Segments.BODY]: Joi.object().keys({
        pending_unconformity_id: Joi.string().required(),
        immediate_action: Joi.string().required(),
        root_cause: Joi.string().required(),
        corrective_action: Joi.string().required(),
    })
}

resolvedUnconformityValidator.get = {
    [Segments.QUERY]: Joi.object().keys({
        resolved_unconformity_id: Joi.string().optional(),
        pending_unconformity_id: Joi.string().optional(),
    })
}

resolvedUnconformityValidator.update = {
    [Segments.PARAMS]: Joi.object().keys({
        resolved_unconformity_id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
        immediate_action: Joi.string().optional(),
        root_cause: Joi.string().optional(),
        corrective_action: Joi.string().optional(),
    })
}

resolvedUnconformityValidator.delete = {
    [Segments.PARAMS]: Joi.object().keys({
        resolved_unconformity_id: Joi.string().required(),
    })
}

module.exports = resolvedUnconformityValidator;