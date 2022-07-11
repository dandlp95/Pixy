// Albums Route
const albumsRoute = require("express").Router();
const albumsController = require("../controllers/albums-controller");

// Get all albums
albumsRoute.get(
  "/",
  albumsController.getAlbums
  /* #swagger.tags = ['Albums'] */
  /* #swagger.summary = 'Gets all Albums' */
  /* #swagger.description = 'Gets all Albums from the database' */
  /* #swagger.operationId = 'getAlbums.' */
  /* #swagger.responses[200] = {
        description: 'Returned all Albums successfully.',
        schema: {$ref: '#/definitions/Albums'}
    } */
);

// Get one album
albumsRoute.get(
  "/:id",
  albumsController.getAlbum
  /* #swagger.tags = ['Albums'] */
  /* #swagger.summary = 'Gets an Album by Id.' */
  /* #swagger.description = 'Gets an Album by the Id requested from the database.' */
  /* #swagger.operationId = 'getAlbum' */
  /* #swagger.parameters['id'] = {description: 'Album Id'} */
  /* #swagger.responses[200] = {
      description: 'Returned an Album by Id successfully',
      schema: { $ref: '#/definitions/Album'}
    } */
);

// Add an album
albumsRoute.post(
  "/add",
  albumsController.addAlbum
  /* #swagger.tags = ['Albums'] */
  /* #swagger.summary = 'Adds a new Album.' */
  /* #swagger.description = 'Adds a new Album to the database .' */
  /* #swagger.operationId = 'addAlbum' */
  /* #swagger.parameters = [{
      name: 'body', 
      in:'body',
      schema: { $ref: '#/definitions/Albums' }
    }] */
  /* #swagger.responses[200] = {
      description: 'Album successfully sent to database',
      schema: { $ref: '#/definitions/Album'}
    }
    */
);

// Edit an album
albumsRoute.put(
  "/edit/:id",
  albumsController.editAlbum
  /* #swagger.tags = ['Albums'] */
  /* #swagger.summary = 'Edits an Album by Id.' */
  /* #swagger.description = 'Send updated information about the Album by Id to the database.' */
  /* #swagger.operationId = 'editAlbum' */
  /* #swagger.parameters = [{
  name: 'body', 
  in:'body',
  schema: { $ref: '#/definitions/Albums' }
}] */
  /* #swagger.responses[200] = {
  description: 'Album successfully updated',
  schema: { $ref: '#/definitions/Album'}
}
*/
);

// Delete an album
albumsRoute.delete(
  "/delete/:id",
  albumsController.deleteAlbum
  /* #swagger.tags = ['Albums'] */
  /* #swagger.summary = 'Deletes an Album by Id.' */
  /* #swagger.description = 'Deletes an Album from the database by the Album Id.' */
  /* #swagger.operationId = 'deleteAlbum' */
  /* #swagger.responses[200] = {
description: 'Album successfully deleted',
schema: { $ref: '#/definitions/Album'}
}
*/
);

module.exports = albumsRoute;
