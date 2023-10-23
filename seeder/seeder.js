// import { Sequelize } from "sequelize-typescript";
// import * as bcrypt from 'bcrypt'
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt')

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: 'gaboot',
  username: 'root',
  password: '',
  host: '127.0.0.1',
  port: 3306, // Replace with your database port
});
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
      INSERT INTO master_users (firstName, lastName, userName, email, password) VALUES
      ('admin', 'admin', 'admin', 'admin@example.com', '${password}');
      -- Add more INSERT statements for additional users
    `);

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Close the database connection
    sequelize.close();
  }
}

// Call the seeder function to populate the database
seedUsers();