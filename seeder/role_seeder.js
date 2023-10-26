const { sequelize } = require('./config.db');

async function seedRole() {
  try {
    await sequelize.authenticate();

    await sequelize.query(`
      INSERT INTO master_roles (roleName)
      VALUES ('Admin')
    `);

    console.log('role seed data inserted successfully');
  } catch (error) {
    console.error(error);
  }
}

module.exports = { seedRole };