const { sequelize } = require('./config.db');

const bcrypt = require('bcrypt');

async function getHash(password) {
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
}
// Define your seeder function
async function seedUsers() {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database');

    const password = await getHash('admin');
    // Insert seed data
    await sequelize.query(`
      INSERT INTO master_users (firstName, lastName, userName, email, password, roleId) VALUES
      ('admin', 'admin', 'admin', 'admin@example.com', '${password}', 1);
      -- Add more INSERT statements for additional users
    `);

    console.log('User seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

module.exports = { seedUsers };
