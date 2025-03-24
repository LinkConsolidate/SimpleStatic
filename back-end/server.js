const express = require('express');
const db = require('./models');
const router = require('./services/router');
const { Sequelize } = require('sequelize');

const app = express();
const port = 3000;

const config = require('./config/config.json')['development'];
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
});

app.use(express.json());
app.use(router);

const createDatabaseIfNotExists = async () => {
  try {
    const [results, metadata] = await sequelize.query("SHOW DATABASES LIKE ?", {
      replacements: [config.database],
    });

    if (results.length === 0) {
      console.log(`Database ${config.database} not found, creating it...`);
      await sequelize.query(`CREATE DATABASE ${config.database}`);
      console.log(`Database ${config.database} created!`);
    } else {
      console.log(`Database ${config.database} exists.`);
    }
  } catch (error) {
    console.error('Error checking/creating database:', error);
  }
};

const startServer = async () => {
  await createDatabaseIfNotExists();

  db.sequelize.sync().then(() => {
    console.log('Database synced!');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }).catch((err) => {
    console.error('Error syncing database:', err);
  });
};

startServer();