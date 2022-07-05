// Photos route
const photosRoute = require("express").Router();
const photosController = require("../controllers/photos-controller");

// Get all photos
photosRoute.get(
  "/",
  photosController.getPhotos
  /* #swagger.summary = 'Gets all Photos' */
  /* #swagger.description = 'Gets all Photos from the database' */
  /* #swagger.operationId = 'getPhotos.' */
  /* #swagger.responses[200] = {
        description: 'Returned all Photos successfully.',
        schema: {$ref: '#/definitions/Photos'}
    } */
);

// Get one photo
photosRoute.get(
  "/:id",
  photosController.getPhoto
  /* #swagger.summary = 'Gets a Photo by it's Id.' */
  /* #swagger.description = 'Gets a Photo by the Id requested from the database.' */
  /* #swagger.operationId = 'getPhoto' */
  /* #swagger.parameters['id'] = {description: 'Photo Id'} */
  /* #swagger.responses[200] = {
      description: 'Returned Photo by Id successfully',
      schema: { $ref: '#/definitions/Photos'}
    } */
);

// Add an photo
photosRoute.post(
  "/add",
  photosController.addPhoto
  /* #swagger.summary = 'Adds a new Photo.' */
  /* #swagger.description = 'Adds a new Photo to the database .' */
  /* #swagger.operationId = 'addPhoto' */
  /* #swagger.parameters = [{
      name: 'body', 
      in:'body',
      schema: { $ref: '#/definitions/Photos' }
    }] */
  /* #swagger.responses[200] = {
      description: 'Photo successfully sent to database',
      schema: { $ref: '#/definitions/Photos'}
    }
    */
);

// Edit an photo
photosRoute.put(
  "/edit/:id",
  photosController.editPhoto
  /* #swagger.summary = 'Edits a Photo by it's Id.' */
  /* #swagger.description = 'Send updated information about the Photo by Id to the database.' */
  /* #swagger.operationId = 'editPhoto' */
  /* #swagger.parameters = [{
  name: 'body', 
  in:'body',
  schema: { $ref: '#/definitions/Photos' }
}] */
  /* #swagger.responses[200] = {
  description: 'Photo successfully updated',
  schema: { $ref: '#/definitions/Photos'}
}
*/
);

// Delete an photo
photosRoute.delete(
  "/delete/:id",
  photosController.deletePhoto
  /* #swagger.summary = 'Deletes a Photo by Id.' */
  /* #swagger.description = 'Deletes a Photo from the database by the Photo's Id.' */
  /* #swagger.operationId = 'deletePhoto' */
  /* #swagger.responses[200] = {
description: 'Photo successfully deleted',
schema: { $ref: '#/definitions/Photos'}
}
*/
);

module.exports = photosRoute;
