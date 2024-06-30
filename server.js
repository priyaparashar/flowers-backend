const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const flowerRoutes = require('./routes/flowerRoutes');
const port = process.env.PORT
const app = express();

// Use Morgan to log requests to the console
app.use(morgan('combined'));

app.use(bodyParser.json());

// Use flower routes
app.use('/api', flowerRoutes);

// Default error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
