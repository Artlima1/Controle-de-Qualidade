
exports.up = function(knex) {
    return knex.schema.createTable('complete_unconformity', function(table){
        table.string('complete_unconformity_id').notNullable().primary();
        table.string('resolved_unconformity_id').notNullable();
        table.foreign('resolved_unconformity_id').references('resolved_unconformity_id').inTable('resolved_unconformity').onDelete('cascade');
        table.string('efficiency_evaluation').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('complete_unconformity');
};
