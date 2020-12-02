const { celebrate } = require('celebrate');
const express = require('express');
const routes = express.Router();

const {authenticateToken, isManager} = require('./utils/Authentication')

const userController = require('./controllers/userController');
const pendingUnconformityController = require('./controllers/pendingUnconformityController');
const resolvedUnconformityController = require('./controllers/resolvedUnconformityController');
const sessionController = require('./controllers/sessionController');

const userValidator = require('./validators/userValidator');
const pendingUnconformityValidator = require('./validators/pendingUnconformityValidator');
const resolvedUnconformityValidator = require('./validators/resolvedUnconformityValidator');
const sessionValidator = require('./validators/sessionValidator');


//User
routes.get('/users', celebrate(userValidator.getUsers), authenticateToken, userController.getUsers);
routes.post('/users',  celebrate(userValidator.create), authenticateToken, isManager, userController.createUser);
routes.delete('/users/:user_id', celebrate(userValidator.delete), authenticateToken, isManager, userController.deleteUser);

//Pending Unconformity
routes.get('/pendingunconformity', celebrate(pendingUnconformityValidator.get), authenticateToken, isManager,pendingUnconformityController.getAllUnconformities);
routes.get('/mypendingunconformities', celebrate(pendingUnconformityValidator.get), authenticateToken, pendingUnconformityController.getMyUnconformities);
routes.post('/pendingunconformity', celebrate(pendingUnconformityValidator.create), authenticateToken, pendingUnconformityController.createUnconformity);
routes.put('/pendingunconformity/:pending_unconformity_id', authenticateToken, celebrate(pendingUnconformityValidator.update), pendingUnconformityController.updateUnconformity);
routes.delete('/pendingunconformity/:pending_unconformity_id', isManager,authenticateToken, celebrate(pendingUnconformityValidator.delete), pendingUnconformityController.deleteUnconformity);

//Resolved Unconformity
routes.get('/resolvedunconformity', celebrate(resolvedUnconformityValidator.get), authenticateToken, isManager, resolvedUnconformityController.getAllUnconformities);
routes.post('/resolvedunconformity', celebrate(resolvedUnconformityValidator.create), authenticateToken, resolvedUnconformityController.createUnconformity);
routes.put('/resolvedunconformity/:resolved_unconformity_id', authenticateToken, celebrate(resolvedUnconformityValidator.update), resolvedUnconformityController.updateUnconformity);
routes.delete('/resolvedunconformity/:resolved_unconformity_id', authenticateToken, isManager, celebrate(resolvedUnconformityValidator.delete), resolvedUnconformityController.deleteUnconformity);

//Session
routes.post('/signin', celebrate(sessionValidator.signIn), sessionController.signIn);

module.exports = routes;