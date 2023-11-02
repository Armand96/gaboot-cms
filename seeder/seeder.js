const { sequelize } = require('./config.db');
const { seedUsers } = require('./user_seeder');
const { seedMenu } = require('./menu_seeder');
const { seedSubmenu } = require('./submenu_seeder');
const { seedRole } = require('./role_seeder');
const { seedAccess } = require('./role_menu_access_seeder');

async function seedDB() {
  await seedRole();
  await seedUsers();
  await seedMenu();
  await seedSubmenu();
  await seedAccess();

  sequelize.close();
}

seedDB();