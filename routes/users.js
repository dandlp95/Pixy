// Users route
const usersRoute = require('express').Router();
const usersController = require('../controllers/users-controller');

usersRoute.get('/', usersController.getUsers);          // Get all users
usersRoute.get('/:id', usersController.getUser);        // Get one user
usersRoute.post('/add-user/', usersController.addUser);          // Add an user
usersRoute.put('/edit-user/:id', usersController.editUser);       // Edit an user
usersRoute.delete('/delete-user/:id', usersController.deleteUser);  // Delete an user

module.exports = usersRoute;