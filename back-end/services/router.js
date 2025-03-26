const express = require('express');
const db = require('../models'); // Import Sequelize models
const router = express.Router();

/**
 * @swagger
 * /collection:
 *   get:
 *     summary: Retrieve all pictures
 *     description: Fetch all pictures from the collection
 *     responses:
 *       200:
 *         description: A list of pictures
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Picture'
 *       500:
 *         description: Internal Server Error
 */
router.get('/collection', async (req, res) => {
    try {
        const pictures = await db.Picture.findAll();
        res.json(pictures);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /collection/get:
 *   get:
 *     summary: Retrieve a specific picture by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the picture
 *     responses:
 *       200:
 *         description: Picture details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Picture'
 *       404:
 *         description: Picture not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/collection/get', async (req, res) => {
    const { id } = req.query;
    
    try {
        const picture = await db.Picture.findByPk(id);
        if (!picture) return res.status(404).json({ error: 'Picture not found' });
        res.json(picture);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /collection/add:
 *   post:
 *     summary: Add a new picture
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Picture'
 *     responses:
 *       201:
 *         description: Picture added successfully
 *       400:
 *         description: All fields are required
 *       500:
 *         description: Internal Server Error
 */
router.post('/collection/add', async (req, res) => {
    try {
        const { name, category, date, image } = req.body;

        if (!name || !category || !date || !image) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newPicture = await db.Picture.create({ name, category, date, image });
        res.status(201).json(newPicture);
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /collection/update:
 *   put:
 *     summary: Update a picture
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the picture
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Picture'
 *     responses:
 *       200:
 *         description: Picture updated successfully
 *       404:
 *         description: Picture not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/collection/update', async (req, res) => {
    const { id } = req.query;

    try {
        const picture = await db.Picture.findByPk(id);
        if (!picture) return res.status(404).json({ error: 'Picture not found' });

        await picture.update(req.body);
        res.json(picture);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /collection/delete:
 *   delete:
 *     summary: Delete a picture
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the picture
 *     responses:
 *       200:
 *         description: Picture deleted successfully
 *       404:
 *         description: Picture not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/collection/delete', async (req, res) => {
    const { id } = req.query;

    try {
        const picture = await db.Picture.findByPk(id);
        if (!picture) return res.status(404).json({ error: 'Picture not found' });

        await picture.destroy();
        res.json({ message: 'Picture deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Picture:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - date
 *         - image
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID of the picture
 *         name:
 *           type: string
 *           description: The name of the picture
 *         category:
 *           type: string
 *           description: The category of the picture
 *         date:
 *           type: string
 *           format: date
 *           description: Date the picture was taken
 *         image:
 *           type: string
 *           description: Image filename
 *       example:
 *         id: 1
 *         name: "Sky"
 *         category: "nature"
 *         date: "1999-01-12"
 *         image: "sky.jpg"
 */