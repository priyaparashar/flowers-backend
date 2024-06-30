const express = require('express');
const router = express.Router();
const flowerController = require('../controllers/flowerController');
const flowersPath = '/flowers'
// Define routes and map to controller methods
router.post(`${flowersPath}`, flowerController.createFlower);
router.get(`${flowersPath}`, flowerController.getAllFlowers);
router.get(`${flowersPath}/:id`, flowerController.getFlowerById);
router.put(`${flowersPath}/:id`, flowerController.updateFlowerById);
router.delete(`${flowersPath}/:id`, flowerController.deleteFlowerById);

module.exports = router;
