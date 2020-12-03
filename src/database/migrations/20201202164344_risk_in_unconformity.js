
exports.up = function(knex) {
    return knex.schema.createTable('risk_in_unconformity', function(table){
        table.integer('risk_id').notNullable();
        table.foreign('risk_id').references('risk_id').inTable('risk').onDelete('cascade');
        table.string('unconformity_id').notNullable();
        table.foreign('unconformity_id').references('complete_unconformity_id').inTable('complete_unconformity').onDelete('cascade');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('risk_in_unconformity');
};

