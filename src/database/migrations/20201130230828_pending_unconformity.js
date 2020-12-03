
exports.up = function(knex) {
    return knex.schema.createTable('pending_unconformity', function(table){
        table.string('pending_unconformity_id').notNullable().primary();
        table.string('created_by').notNullable();
        table.foreign('created_by').references('user_id').inTable('users').onUpdate('CASCADE');
        table.string('responsable').notNullable();
        table.foreign('responsable').references('user_id').inTable('users').onUpdate('CASCADE');
        table.string('description').notNullable();
        table.enu('area', ['adm', 'qualidade', 'biomol', 'citometria', 'citogenetica', 'histocompatibilidade']).notNullable();
        table.enu('origin', ['externa', 'interna']).notNullable();
        table.enu('type', ['real', 'potencial']).notNullable();
        table.enu('classification', ['NearMiss', 'Evento Adverso', 'Incidente sem dano', 'Circunstancia notificavel']).notNullable();
        table.enu('severity', ['leve', 'moderada', 'grave' ]).notNullable();
        table.boolean('resolved').notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('pending_unconformity');
};
