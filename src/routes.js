const { celebrate } = require('celebrate');
const express = require('express');
const routes = express.Router();

const userController = require('./controllers/userController');

const userValidator = require('./validators/userValidator')

routes.get('/users', celebrate(userValidator.getUsers), userController.getUsers);
routes.post('/users', celebrate(userValidator.create), userController.createUser);
routes.delete('/users/:user_id', celebrate(userValidator.delete), userController.deleteUser);

module.exports = routes;