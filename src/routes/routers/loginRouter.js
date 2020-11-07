const express = require('express');
const LoginController = require('../controllers/loginController');

const router = express.Router();
const LoginCtlr = new LoginController();

router.post('/', (req, res) => LoginCtlr.signIn(req, res));

module.exports = router;
