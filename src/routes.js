const { celebrate } = require('celebrate');
const express = require('express');
const routes = express.Router();

const userController = require('./controllers/userController');
const pendingUnconformityController = require('./controllers/pendingUnconformityController');

const userValidator = require('./validators/userValidator');
const pendingUnconformityValidator = require('./validators/pendingUnconformityValidator')

routes.get('/users', celebrate(userValidator.getUsers), userController.getUsers);
routes.post('/users', celebrate(userValidator.create), userController.createUser);
routes.delete('/users/:user_id', celebrate(userValidator.delete), userController.deleteUser);

routes.get('/pendingunconformity', celebrate(pendingUnconformityValidator.get), pendingUnconformityController.getUnconformities);
routes.post('/pendingunconformity', celebrate(pendingUnconformityValidator.create), pendingUnconformityController.createUnconformity);
routes.put('/pendingunconformity/:pending_unconformity_id', celebrate(pendingUnconformityValidator.update), pendingUnconformityController.updateUnconformity);
routes.delete('/pendingunconformity/:pending_unconformity_id', celebrate(pendingUnconformityValidator.delete), pendingUnconformityController.deleteUnconformity);

module.exports = routes;