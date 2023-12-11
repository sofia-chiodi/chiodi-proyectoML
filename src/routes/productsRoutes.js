const express = require('express');
const productsRouter = express.Router();
const productsController = require('../controllers/productsController');
const upload = require('../middlewares/multerP');

/* Middlewares */
const authMiddleware = require('../middlewares/authMiddleware');

/* Routes */
productsRouter.get('/', productsController.index);
productsRouter.get('/:id', productsController.detail);

module.exports = productsRouter;
