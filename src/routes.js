const { celebrate } = require('celebrate');
const express = require('express');
const routes = express.Router();

const {authenticateToken, isManager} = require('./utils/Authentication')

const userController = require('./controllers/userController');
const pendingUnconformityController = require('./controllers/pendingUnconformityController');
const resolvedUnconformityController = require('./controllers/resolvedUnconformityController');
const completeUnconformityController = require('./controllers/completeUnconformityController');
const riskController = require('./controllers/riskController');
const sessionController = require('./controllers/sessionController');

const userValidator = require('./validators/userValidator');
const pendingUnconformityValidator = require('./validators/pendingUnconformityValidator');
const resolvedUnconformityValidator = require('./validators/resolvedUnconformityValidator');
const completeUnconformityValidator = require('./validators/completeUnconformityValidator');
const riskValidator = require('./validators/riskValidator');
const sessionValidator = require('./validators/sessionValidator');


//User
routes.get('/users', celebrate(userValidator.getUsers), authenticateToken, userController.getUsers);
routes.post('/users',  celebrate(userValidator.create), authenticateToken, isManager, userController.createUser);
routes.delete('/users/:user_id', celebrate(userValidator.delete), authenticateToken, isManager, userController.deleteUser);

//Pending Unconformity
routes.get('/pendingunconformity', celebrate(pendingUnconformityValidator.get), authenticateToken, isManager,pendingUnconformityController.getAllUnconformities);
routes.get('/mypendingunconformities', celebrate(pendingUnconformityValidator.get), authenticateToken, pendingUnconformityController.getMyUnconformities);
routes.post('/pendingunconformity', celebrate(pendingUnconformityValidator.create), authenticateToken, pendingUnconformityController.createUnconformity);
routes.put('/pendingunconformity/:pending_unconformity_id', celebrate(pendingUnconformityValidator.update), authenticateToken, pendingUnconformityController.updateUnconformity);
routes.delete('/pendingunconformity/:pending_unconformity_id', celebrate(pendingUnconformityValidator.delete), isManager,authenticateToken, pendingUnconformityController.deleteUnconformity);

//Resolved Unconformity
routes.get('/resolvedunconformity', celebrate(resolvedUnconformityValidator.get), authenticateToken, isManager, resolvedUnconformityController.getAllUnconformities);
routes.post('/resolvedunconformity', celebrate(resolvedUnconformityValidator.create), authenticateToken, resolvedUnconformityController.createUnconformity);
routes.put('/resolvedunconformity/:resolved_unconformity_id', celebrate(resolvedUnconformityValidator.update), authenticateToken, resolvedUnconformityController.updateUnconformity);
routes.delete('/resolvedunconformity/:resolved_unconformity_id', celebrate(resolvedUnconformityValidator.delete), authenticateToken, isManager, resolvedUnconformityController.deleteUnconformity);

//Complete Unconformity
routes.get('/completeunconformity', celebrate(completeUnconformityValidator.get), authenticateToken, isManager, completeUnconformityController.getAllUnconformities);
routes.post('/completeunconformity', celebrate(completeUnconformityValidator.create), authenticateToken, isManager, completeUnconformityController.createUnconformity);
routes.put('/completeunconformity/:complete_unconformity_id', celebrate(completeUnconformityValidator.update), authenticateToken, isManager, completeUnconformityController.updateUnconformity);
routes.delete('/completeunconformity/:complete_unconformity_id', celebrate(completeUnconformityValidator.delete), authenticateToken, isManager, completeUnconformityController.deleteUnconformity);

//Risk
routes.get('/risk', celebrate(riskValidator.get), authenticateToken, isManager, riskController.getRisks);
routes.post('/risk', celebrate(riskValidator.create), authenticateToken, isManager, riskController.createrisk);
routes.put('/risk/:risk_id', celebrate(riskValidator.update), authenticateToken, isManager, riskController.updatedRisk);
routes.delete('/risk/:risk_id', celebrate(riskValidator.delete), authenticateToken, isManager, riskController.deleterisk);

//Session
routes.post('/signin', celebrate(sessionValidator.signIn), sessionController.signIn);

module.exports = routes;