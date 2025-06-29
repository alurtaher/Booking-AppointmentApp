const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/add-user', userController.addUser);
router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router;