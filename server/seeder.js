require('dotenv').config();
const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const path = require('path');

let username =  process.env.MYSQL_USERNAME;
let password =  process.env.MYSQL_PASSWORD;
let host =  process.env.MYSQL_HOST;
let db = process.env.MYSQL_DB_NAME;

const sequelize = new Sequelize(`${db}`, username, password, {
    host: host || 'localhost',
    dialect: 'mysql', // or 'mysql', 'sqlite', 'mssql', depending on your database
    logging: false,
});

const umzug = new Umzug({
    migrations: {
      glob: path.join(__dirname, 'db/seeders/*.js'),  // Path to migration files
      resolve: ({name, path, context}) => {
        const migration = require(path);
        return {
          name,
          up: async () => migration.up(context, Sequelize),
          down: async () => migration.down(context, Sequelize),
        };
      }
    },
    context: sequelize.getQueryInterface(),  // Pass the QueryInterface as context
    storage: new SequelizeStorage({ sequelize }),  // Tracks migrations in the DB
    logger: console,
});

const runMigrations = async () => {
  try {
    const action = process.argv[2];
    if (action === 'down') {
      await umzug.down();
      console.log('Migration rolled back successfully');
    } else {
      await umzug.up();
      console.log('All migrations executed successfully');
    }
  } catch (error) {
    console.error('Failed to run migrations:', error);
  }
};

runMigrations();
