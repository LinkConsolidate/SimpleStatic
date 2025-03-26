const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const db = require('./models');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite')
});

const seedDatabase = async () => {
    try {
        await sequelize.sync();

        const dataPath = path.join(__dirname, 'data/default_data.json');
        const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

        await db.Picture.bulkCreate(jsonData);

        console.log('Database seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit();
    }
};

seedDatabase();