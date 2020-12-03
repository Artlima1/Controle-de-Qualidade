
exports.up = function(knex) {
    return knex.schema.createTable('norm_in_unconformity', function(table){
        table.string('norm_item').notNullable();
        table.string('unconformity_id').notNullable();
        table.foreign('unconformity_id').references('complete_unconformity_id').inTable('complete_unconformity').onDelete('cascade');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('norm_in_unconformity');
}