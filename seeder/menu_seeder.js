const { sequelize } = require('./config.db');

async function seedMenu(){
  try {
    await sequelize.authenticate();

    await sequelize.query(`
      INSERT INTO master_menus (menuName, menuIcon, frontendUrl, backendUrl, menuHaveChild, menuIsActive)
      VALUES ('User', 'fas fa-user', null, null, 1, 1)
    `);

    console.log('menu seed data inserted successfully');
  } catch (error) {
    console.error(error);
  }
}

module.exports = { seedMenu };