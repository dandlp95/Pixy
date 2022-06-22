// Users route
const usersRoute = require('express').Router();
const usersController = require('../controllers/users-controller');

usersRoute.get('/', usersController.getUsers);          // Get all users
usersRoute.get('/:id', usersController.getUser);        // Get one user
usersRoute.post('/', usersController.addUser);          // Add an user
usersRoute.put('/:id', usersController.editUser);       // Edit an user
usersRoute.delete('/:id', usersController.deleteUser);  // Delete an user

module.exports = usersRoutes;