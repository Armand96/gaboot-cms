const { sequelize } = require('./config.db');

async function seedAccess(){
  try {
    await sequelize.authenticate();

    /* ROLE MENU */
    await sequelize.query(`
      INSERT INTO role_menus (roleId, menuId)
      VALUES (1, 1)
    `);

    /* ROLE SUBMENU */
    await sequelize.query(`
      INSERT INTO role_submenus (roleId, roleMenuId, submenu_id)
      VALUES (1, 1, 1),
      (1, 1, 2),
      (1, 1, 3)
    `);

    /* ROLE ACCESS */
    await sequelize.query(`
      INSERT INTO role_accesses (roleId, menuId, submenu_id, frontendUrl, backendUrl, createAccess, readAccess, updateAccess, deleteAccess)
      VALUES (1, 1, 1, '/user', '/user', 1, 1, 1, 1),
      (1, 1, 2, '/role', '/role', 1, 1, 1, 1),
      (1, 1, 3, '/menu', '/menu', 1, 1, 1, 1)
    `);

    console.log('access menu seed data inserted successfully');
  } catch (error) {
    console.error(error);
  }
}

module.exports = { seedAccess };