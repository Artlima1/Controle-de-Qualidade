
exports.up = function(knex) {
    return knex.schema.createTable('risk', function(table){
        table.increments('risk_id').notNullable().primary();
        table.string('description').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('risk');
};

