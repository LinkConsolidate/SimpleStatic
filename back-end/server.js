const express = require('express');
const db = require('./models');
const router = require('./services/router');
const { Sequelize } = require('sequelize');
const path = require('path');
const { specs, swaggerUi } = require('./swagger');
const cors = require('cors');


const app = express();
const port = 3000;

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite')
});

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Add a router and handle undefined endpoints
app.use(router);
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

const startServer = async () => {
  try {
    await db.sequelize.sync();
    console.log('Database synced!');

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Error syncing database:', err);
  }
};

startServer();