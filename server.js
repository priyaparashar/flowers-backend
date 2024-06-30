const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const port = 8080;

// Use Morgan to log requests to the console
app.use(morgan('combined'));

app.use(bodyParser.json());

// Sample data
let flowers = [
  { id: 1, name: 'Rose', description: 'Classic flower with beautiful petals' },
  { id: 2, name: 'Sunflower', description: 'Bright and cheerful flower' },
  { id: 3, name: 'Lily', description: 'Soft and elegant flower' },
  { id: 4, name: 'Daisy', description: 'Cheerful and fragrant flower' },
  { id: 5, name: 'Lotus', description: 'Exotic and serene flower' },
  { id: 6, name: 'Orchid', description: 'Delicate and elegant flower' },
];

// Create a new flower
app.post('/flowers', (req, res, next) => {
  try {
    const newItem = {
      id: flowers.length ? flowers[flowers.length - 1].id + 1 : 1,
      name: req.body.name,
      description: req.body.description,
    };
    flowers.push(newItem);
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
});

// Read all flowers
app.get('/flowers', (req, res, next) => {
  try {
    res.json(flowers);
  } catch (err) {
    next(err);
  }
});

// Read a single flower by ID
app.get('/flowers/:id', (req, res, next) => {
  try {
    const flower = flowers.find(i => i.id === parseInt(req.params.id));
    if (!flower) return res.status(404).send('Item not found');
    res.json(flower);
  } catch (err) {
    next(err);
  }
});

// Update an flower by ID
app.put('/flowers/:id', (req, res, next) => {
  try {
    const flower = flowers.find(i => i.id === parseInt(req.params.id));
    if (!flower) return res.status(404).send('Item not found');

    flower.name = req.body.name || flower.name;
    flower.description = req.body.description || flower.description;
    res.json(flower);
  } catch (err) {
    next(err);
  }
});

// Delete an flower by ID
app.delete('/flowers/:id', (req, res, next) => {
  try {
    const itemIndex = flowers.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).send('Item not found');

    const deletedItem = flowers.splice(itemIndex, 1);
    res.json(deletedItem);
  } catch (err) {
    next(err);
  }
});

// Default error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

