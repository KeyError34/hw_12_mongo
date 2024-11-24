import { Router } from 'express';
import { getDB } from '../db/index.js';
import { ObjectId } from 'mongodb';

const router = Router();
const db = getDB();

// POST /products — создать продукт
router.post('/', async (req, res) => {
  try {
    const product = req.body;
    const result = await db.collection('products').insertOne(product);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /products — получить список продуктов
router.get('/', async (req, res) => {
  try {
    const products = await db.collection('products').find().toArray();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /products/:id — получить продукт по ID
router.get('/:id', async (req, res) => {
  try {
    const product = await db.collection('products').findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Invalid ID format' });
  }
});

// PUT /products/:id — обновить продукт
router.put('/:id', async (req, res) => {
  try {
    const result = await db
      .collection('products')
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Invalid ID format' });
  }
});

// DELETE /products/:id — удалить продукт
router.delete('/:id', async (req, res) => {
  try {
    const result = await db.collection('products').deleteOne({
      _id: new ObjectId(req.params.id),
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Invalid ID format' });
  }
});

export default router;
