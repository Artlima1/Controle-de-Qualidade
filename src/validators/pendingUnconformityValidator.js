const { Segments, Joi } = require('celebrate');

const pendingUnconformityValidator = new Object();


pendingUnconformityValidator.create = {
    [Segments.BODY]: Joi.object().keys({
        responsable: Joi.string().required(),
        description: Joi.string().required(),
        area: Joi.string().valid('adm', 'qualidade', 'biomol', 'citometria', 'citogenetica', 'histocompatibilidade').required(),
        origin: Joi.string().valid('externa', 'interna').required(),
        type: Joi.string().valid('real', 'potencial').required(),
        classification: Joi.string().valid('NearMiss', 'Evento Adverso', 'Incidente sem dano', 'Circunstancia notificavel').required(),
        severity: Joi.string().valid('leve', 'moderada', 'grave').required(),
    })
}

pendingUnconformityValidator.get = {
    [Segments.QUERY]: Joi.object().keys({
        pending_unconformity_id: Joi.string().optional(),
        created_by: Joi.string().optional(),
        responsable: Joi.string().optional(),
        description: Joi.string().optional(),
        area: Joi.string().valid('adm', 'qualidade', 'biomol', 'citometria', 'citogenetica', 'histocompatibilidade').optional(),
        origin: Joi.string().valid('externa', 'interna').optional(),
        type: Joi.string().valid('real', 'potencial').optional(),
        classification: Joi.string().valid('NearMiss', 'Evento Adverso', 'Incidente sem dano', 'Circunstancia notificavel').optional(),
        severity: Joi.string().valid('leve', 'moderada', 'grave').optional(),
    })
}

pendingUnconformityValidator.update = {
    [Segments.PARAMS]: Joi.object().keys({
        pending_unconformity_id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
        created_by: Joi.string().optional(),
        responsable: Joi.string().optional(),
        description: Joi.string().optional(),
        area: Joi.string().valid('adm', 'qualidade', 'biomol', 'citometria', 'citogenetica', 'histocompatibilidade').optional(),
        origin: Joi.string().valid('externa', 'interna').optional(),
        type: Joi.string().valid('real', 'potencial').optional(),
        classification: Joi.string().valid('NearMiss', 'Evento Adverso', 'Incidente sem dano', 'Circunstancia notificavel').optional(),
        severity: Joi.string().valid('leve', 'moderada', 'grave').optional(),
    })
}

pendingUnconformityValidator.delete = {
    [Segments.PARAMS]: Joi.object().keys({
        pending_unconformity_id: Joi.string().required(),
    })
}

module.exports = pendingUnconformityValidator;