
let flowers = [
    { id: 1, name: 'Rose', description: 'Classic flower with beautiful petals' },
    { id: 2, name: 'Sunflower', description: 'Bright and cheerful flower' },
    { id: 3, name: 'Lily', description: 'Soft and elegant flower' },
    { id: 4, name: 'Daisy', description: 'Cheerful and fragrant flower' },
    { id: 5, name: 'Lotus', description: 'Exotic and serene flower' },
    { id: 6, name: 'Orchid', description: 'Delicate and elegant flower' },
  ];
  
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
  