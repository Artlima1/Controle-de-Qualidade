const { celebrate } = require('celebrate');
const express = require('express');
const routes = express.Router();

const {authenticateToken} = require('./utils/Authentication')

const userController = require('./controllers/userController');
const pendingUnconformityController = require('./controllers/pendingUnconformityController');
const sessionController = require('./controllers/sessionController');

const userValidator = require('./validators/userValidator');
const pendingUnconformityValidator = require('./validators/pendingUnconformityValidator');
const sessionValidator = require('./validators/sessionValidator');

routes.get('/users', celebrate(userValidator.getUsers), userController.getUsers);
routes.post('/users', celebrate(userValidator.create), userController.createUser);
routes.delete('/users/:user_id', celebrate(userValidator.delete), userController.deleteUser);

routes.get('/pendingunconformity', celebrate(pendingUnconformityValidator.get), authenticateToken, pendingUnconformityController.getAllUnconformities);
routes.get('/mypendingunconformities', celebrate(pendingUnconformityValidator.get), authenticateToken, pendingUnconformityController.getMyUnconformities);
routes.post('/pendingunconformity', celebrate(pendingUnconformityValidator.create), authenticateToken, pendingUnconformityController.createUnconformity);
routes.put('/pendingunconformity/:pending_unconformity_id', authenticateToken, celebrate(pendingUnconformityValidator.update), pendingUnconformityController.updateUnconformity);
routes.delete('/pendingunconformity/:pending_unconformity_id', authenticateToken, celebrate(pendingUnconformityValidator.delete), pendingUnconformityController.deleteUnconformity);

routes.post('/signin', celebrate(sessionValidator.signIn), sessionController.signIn);

module.exports = routes;