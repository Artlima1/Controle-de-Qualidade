
exports.up = function(knex) {
    return knex.schema.createTable('resolved_unconformity', function(table){
        table.string('resolved_unconformity_id').notNullable().primary();
        table.string('pending_unconformity_id').notNullable();
        table.foreign('pending_unconformity_id').references('pending_unconformity_id').inTable('pending_unconformity').onDelete('cascade');
        table.string('immediate_action').notNullable();
        table.string('root_cause').notNullable();
        table.string('corrective_action').notNullable();
        table.boolean('completed').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('resolved_unconformity');
};
