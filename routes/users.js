// Users route
const usersRoute = require("express").Router();
const usersController = require("../controllers/users-controller");
const {
  addUserValidation,
  editUserValidation,
} = require("../middleware/validators/validators");
// Get all users
usersRoute.get(
  "/",
  usersController.getUsers
  /* #swagger.tags = ['Users'] */
  /* #swagger.summary = 'Gets all Users' */
  /* #swagger.description = 'Gets all Users from the database' */
  /* #swagger.operationId = 'getUsers.' */
  /* #swagger.responses[200] = {
        description: 'Returned all Users successfully.',
        schema: {$ref: '#/definitions/Users'}
    } */
);

// Get one user
usersRoute.get(
  "/:id",
  usersController.getUser
  /* #swagger.tags = ['Users'] */
  /* #swagger.summary = 'Gets a User by Id.' */
  /* #swagger.description = 'Gets a User by the Id requested from the database.' */
  /* #swagger.operationId = 'getUser' */
  /* #swagger.parameters['id'] = {description: 'User Id'} */
  /* #swagger.responses[200] = {
      description: 'Returned a User by Id successfully',
      schema: { $ref: '#/definitions/User'}
    } */
);

// Add an user
usersRoute.post(
  "/add",
  addUserValidation,
  usersController.addUser
  /* #swagger.tags = ['Users'] */
  /* #swagger.summary = 'Adds a new User.' */
  /* #swagger.description = 'Adds a new User to the database .' */
  /* #swagger.operationId = 'addUser' */
  /* #swagger.parameters = [{
      name: 'body', 
      in:'body',
      schema: { $ref: '#/definitions/User' }
    }] */
  /* #swagger.responses[200] = {
      description: 'User successfully sent to database',
      schema: { $ref: '#/definitions/User'}
    }
    */
);

// Edit an user
usersRoute.put(
  "/edit/:id",
  editUserValidation,
  usersController.editUser
  /* #swagger.tags = ['Users'] */
  /* #swagger.summary = 'Edits a User by Id.' */
  /* #swagger.description = 'Send updated information about the User by Id to the database.' */
  /* #swagger.operationId = 'editUser' */
  /* #swagger.parameters = [{
  name: 'body', 
  in:'body',
  schema: { $ref: '#/definitions/User' }
}] */
  /* #swagger.responses[200] = {
  description: 'User successfully updated',
  schema: { $ref: '#/definitions/User'}
}
*/
);

// Delete an user
usersRoute.delete(
  "/delete/:id",
  usersController.deleteUser
  /* #swagger.tags = ['Users'] */
  /* #swagger.summary = 'Deletes a User by Id.' */
  /* #swagger.description = 'Deletes a User from the database by the User Id.' */
  /* #swagger.operationId = 'deleteUser' */
  /* #swagger.responses[200] = {
description: 'User successfully deleted',
schema: { $ref: '#/definitions/User'}
}
*/
);

module.exports = usersRoute;
