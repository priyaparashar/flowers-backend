
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let flowers = [
    { id: 1, name: 'Rose', description: 'Classic flower with beautiful petals' },
    { id: 2, name: 'Sunflower', description: 'Bright and cheerful flower' },
    { id: 3, name: 'Lily', description: 'Soft and elegant flower' },
    { id: 4, name: 'Daisy', description: 'Cheerful and fragrant flower' },
    { id: 5, name: 'Lotus', description: 'Exotic and serene flower' },
    { id: 6, name: 'Orchid', description: 'Delicate and elegant flower' },
  ];

const users = [
  { id: 1, username: 'admin', passwordHash: bcrypt.hashSync('admin', 10) },];

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// Authenticate user and generate JWT token
exports.login = (req, res, next) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed. User not found.' });
  }
  
  // Validate password
  bcrypt.compare(password, user.passwordHash, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ message: 'Authentication failed. Invalid username or password.' });
    }
    
    // Password is correct, generate JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.json({ token });
  });
};


  exports.createFlower = (req, res, next) => {
    try {
      const newFlower = {
        id: flowers.length ? flowers[flowers.length - 1].id + 1 : 1,
        name: req.body.name,
        description: req.body.description,
      };
      flowers.push(newFlower);
      res.status(201).json(newFlower);
    } catch (err) {
      next(err);
    }
  };
  
  exports.register = (req, res) => {
    const { username, password } = req.body;
  
    // Check if user already exists
    if (users.find(user => user.username === username)) {
      return res.status(400).json({ message: 'User already exists' });
    }
  
    // Hash the password
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) throw err;
  
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
  
        // Store the user with the hashed password
        users.push({ id: users.length + 1, username, passwordHash: hash });
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  }
  exports.getAllFlowers = (req, res, next) => {
    console.log('entered here ');
    try {
     
      res.json(flowers);
    
    } catch (err) {
      next(err);
    }
  };
  
  exports.getFlowerById = (req, res, next) => {
    try {
      const flower = flowers.find(f => f.id === parseInt(req.params.id));
      if (!flower) return res.status(404).send('Flower not found');
      res.json(flower);
    } catch (err) {
      next(err);
    }
  };
  
  exports.updateFlowerById = (req, res, next) => {
    try {
      const flower = flowers.find(f => f.id === parseInt(req.params.id));
      if (!flower) return res.status(404).send('Flower not found');
  
      flower.name = req.body.name || flower.name;
      flower.description = req.body.description || flower.description;
      res.json(flower);
    } catch (err) {
      next(err);
    }
  };
  
  exports.deleteFlowerById = (req, res, next) => {
    try {
      const flowerIndex = flowers.findIndex(f => f.id === parseInt(req.params.id));
      if (flowerIndex === -1) return res.status(404).send('Flower not found');
  
      const deletedFlower = flowers.splice(flowerIndex, 1);
      res.json(deletedFlower);
    } catch (err) {
      next(err);
    }
  };
  