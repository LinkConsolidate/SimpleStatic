const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataPath = path.join(__dirname, '../data/collection.json');

const readData = () => JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
const writeData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));

router.get('/collection', (req, res) => {
    const collection = readData();
    res.json(collection);
});

router.get('/collection/get/:id', (req, res) => {
    const collection = readData();
    const item = collection.find((entry) => entry.id === parseInt(req.params.id));

    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
});

router.post('/collection/add', (req, res) => {
    const collection = readData();
    const { name, category, date, image } = req.body;

    if (!name || !category || !date || !image) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newItem = {
        id: collection.length ? collection[collection.length - 1].id + 1 : 1,
        name,
        category,
        date,
        image
    };

    collection.push(newItem);
    writeData(collection);

    res.status(201).json({ message: 'Item added', item: newItem });
});

router.put('/collection/update/:id', (req, res) => {
    const collection = readData();
    const { id } = req.params;
    const { name, category, date, image } = req.body;

    const itemIndex = collection.findIndex((entry) => entry.id === parseInt(id));

    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }

    collection[itemIndex] = {
        ...collection[itemIndex],
        name: name || collection[itemIndex].name,
        category: category || collection[itemIndex].category,
        date: date || collection[itemIndex].date,
        image: image || collection[itemIndex].image
    };

    writeData(collection);

    res.json({ message: 'Item updated', item: collection[itemIndex] });
});

router.delete('/collection/delete/:id', (req, res) => {
    let collection = readData();
    const { id } = req.params;

    const filteredCollection = collection.filter((entry) => entry.id !== parseInt(id));

    if (filteredCollection.length === collection.length) {
        return res.status(404).json({ error: 'Item not found' });
    }

    writeData(filteredCollection);

    res.json({ message: 'Item deleted' });
});

module.exports = router;
