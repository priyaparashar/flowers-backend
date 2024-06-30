const express = require('express');
const router = express.Router();
const flowerController = require('../controllers/flowerController');
const authenticator = require('../middlewares/authenticate');
const flowersPath = '/flowers'

// Public routes
router.post('/login', flowerController.login);
router.post('/register', flowerController.register);
router.get(`${flowersPath}`,  flowerController.getAllFlowers);
router.get(`${flowersPath}/:id`, flowerController.getFlowerById);

// Protected routes
router.post(`${flowersPath}`, authenticator.authenticateToken,  flowerController.createFlower);
router.put(`${flowersPath}/:id`, authenticator.authenticateToken, flowerController.updateFlowerById);
router.delete(`${flowersPath}/:id`,authenticator.authenticateToken, flowerController.deleteFlowerById);

module.exports = router;

