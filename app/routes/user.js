const { Router } = require('express');
const userController = require('../controllers/user');
const AuthService = require('../middlewares/auth');
const route = Router();

route.post('/', userController.create)
route.get('/', userController.index)
route.post('/login', userController.login)
route.delete('/:id', 
    AuthService.getToken, 
    AuthService.decypherToken,
    userController.deleteOneById)

module.exports = route