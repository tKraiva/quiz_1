
exports.up = function(knex, Promise) {
  return knex.schema.createTable('clucks',(table)=>{
      table.increments('id');
      table.text('username');
      table.text('image_url');
      table.text('content');
      table.timestamp('createdAt').default(knex.fn.now());
      table.timestamp('updated_at').default(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('clucks');
};
