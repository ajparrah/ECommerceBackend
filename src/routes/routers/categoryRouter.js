const express = require('express');
const CategoryController = require('../controllers/categoryController');
const { verifyToken, verifyAdminROLE } = require('../middlewares/loginMiddlewares');

const router = express.Router();
const CategoryCtlr = new CategoryController();

router.get('/', verifyToken, (req, res) => CategoryCtlr.getAll(req, res));
router.get('/:id', verifyToken, (req, res) => CategoryCtlr.getById(req, res));
router.post('/', verifyToken, (req, res) => CategoryCtlr.create(req, res));
router.put('/:id', verifyToken, (req, res) => CategoryCtlr.update(req, res));
router.delete('/:id', [verifyToken, verifyAdminROLE], (req, res) => CategoryCtlr.delete(req, res)); // Solo podrá eliminar un usuario administrador

module.exports = router;
