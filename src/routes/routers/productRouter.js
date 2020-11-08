const express = require('express');
const { verifyToken } = require('../middlewares/loginMiddlewares');
const ProductController = require('../controllers/productController');

const router = express.Router();
const ProductCtlr = new ProductController();

router.get('/', verifyToken, (req, res) => ProductCtlr.getAll(req, res));
router.get('/:id', verifyToken, (req, res) => ProductCtlr.getById(req, res));
router.get('/search/:name', verifyToken, (req, res) => ProductCtlr.searchByLikeName(req, res));
router.post('/', verifyToken, (req, res) => ProductCtlr.create(req, res));
router.put('/:id', verifyToken, (req, res) => ProductCtlr.update(req, res));
router.delete('/:id', verifyToken, (req, res) => ProductCtlr.delete(req, res));
module.exports = router;
