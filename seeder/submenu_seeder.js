const { sequelize } = require('./config.db');

async function seedSubmenu() {
  try {
    await sequelize.authenticate();

    await sequelize.query(`
      INSERT INTO master_submenus (menuId, submenuName, submenuIcon, frontendUrl, backendUrl, submenuIsActive)
      VALUES (1, 'User', 'fas fa-user', '/user', '/user', 1),
      (1, 'Role', 'fas fa-user-gear', '/role', '/role', 1),
      (1, 'Menu', 'fas fa-minus', '/menu', '/menu', 1)
    `);

    console.log('menu seed data inserted successfully');
  } catch (error) {
    console.error(error);
  }
}

module.exports = { seedSubmenu }