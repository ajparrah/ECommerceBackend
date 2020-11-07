const express = require('express');
const { verifyToken, verifyAdminROLE } = require('../middlewares/loginMiddlewares');
const UserController = require('../controllers/userController');

const router = express.Router();

router.get('/', verifyToken, (req, res) => UserController.getAll(req, res) );
router.post('/', [verifyToken, verifyAdminROLE], (req, res) => UserController.create(req, res));
router.put('/:id', [verifyToken, verifyAdminROLE], (req, res) => UserController.update(req, res));
router.delete('/:id', [verifyToken, verifyAdminROLE], (req, res) => UserController.delete(req, res));

module.exports = router;
