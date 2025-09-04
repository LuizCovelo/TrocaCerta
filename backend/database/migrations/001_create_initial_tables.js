exports.up = function(knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.string('email', 255).notNullable().unique();
      table.string('password', 255).notNullable();
      table.enum('plan', ['free', 'basic', 'premium']).defaultTo('free');
      table.timestamps(true, true);
    })
    .createTable('vehicles', function (table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.string('brand', 50).notNullable();
      table.string('model', 50).notNullable();
      table.integer('year').notNullable();
      table.integer('mileage').notNullable();
      table.string('plate', 10).notNullable();
      table.string('color', 30);
      table.date('last_oil_change');
      table.timestamps(true, true);

      table.foreign('user_id').references('users.id').onDelete('CASCADE');
    })
    .createTable('maintenances', function (table) {
      table.increments('id').primary();
      table.integer('vehicle_id').unsigned().notNullable();
      table.string('type', 100).notNullable();
      table.text('description');
      table.date('due_date');
      table.integer('due_mileage');
      table.date('completed_date');
      table.enum('status', ['pending', 'completed', 'overdue']).defaultTo('pending');
      table.decimal('cost', 10, 2);
      table.timestamps(true, true);

      table.foreign('vehicle_id').references('vehicles.id').onDelete('CASCADE');
    })
    .createTable('notifications', function (table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.string('type', 50).notNullable();
      table.string('title', 255).notNullable();
      table.text('message').notNullable();
      table.boolean('read').defaultTo(false);
      table.json('data');
      table.timestamps(true, true);

      table.foreign('user_id').references('users.id').onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('notifications')
    .dropTable('maintenances')
    .dropTable('vehicles')
    .dropTable('users');
};
