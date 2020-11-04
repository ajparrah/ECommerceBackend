const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => UserController.getAll(req, res) );
router.post('/', (req, res) => UserController.create(req, res));
router.put('/:id', (req, res) => UserController.update(req, res));
router.delete('/:id', (req, res) => UserController.delete(req, res));

module.exports = router;
