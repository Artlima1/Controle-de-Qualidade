
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table){
        table.string('user_id').notNullable().primary();
        table.string('name').notNullable();
        table.string('firebase_uid').notNullable();
        table.enu('user_type', ['employee', 'manager']).notNullable();
        table.string('email').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
