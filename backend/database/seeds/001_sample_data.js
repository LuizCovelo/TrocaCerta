exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('notifications').del();
  await knex('maintenances').del();
  await knex('vehicles').del();
  await knex('users').del();

  // Reset sequences (PostgreSQL)
  await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
  await knex.raw('ALTER SEQUENCE vehicles_id_seq RESTART WITH 1');
  await knex.raw('ALTER SEQUENCE maintenances_id_seq RESTART WITH 1');
  await knex.raw('ALTER SEQUENCE notifications_id_seq RESTART WITH 1');

  // Insert sample data
  const bcrypt = require('bcryptjs');

  // Sample users
  const [userId] = await knex('users').insert([
    {
      name: 'João Silva',
      email: 'joao@exemplo.com',
      password: await bcrypt.hash('123456', 12),
      plan: 'basic'
    }
  ]).returning('id');

  // Sample vehicles
  const [vehicleId] = await knex('vehicles').insert([
    {
      user_id: userId.id,
      brand: 'Honda',
      model: 'Civic',
      year: 2020,
      mileage: 45000,
      plate: 'ABC-1234',
      color: 'Prata',
      last_oil_change: '2024-06-15'
    }
  ]).returning('id');

  // Sample maintenances
  await knex('maintenances').insert([
    {
      vehicle_id: vehicleId.id,
      type: 'Troca de óleo',
      description: 'Troca de óleo e filtro',
      due_date: '2024-12-15',
      due_mileage: 50000,
      status: 'pending'
    },
    {
      vehicle_id: vehicleId.id,
      type: 'Filtro de ar',
      description: 'Substituição do filtro de ar',
      due_date: '2025-01-15',
      status: 'pending'
    }
  ]);

  // Sample notifications
  await knex('notifications').insert([
    {
      user_id: userId.id,
      type: 'maintenance_due',
      title: 'Manutenção próxima',
      message: 'Troca de óleo vence em 5 dias',
      read: false
    }
  ]);
};
