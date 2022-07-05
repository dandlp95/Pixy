// Clips route
const clipsRoute = require("express").Router();
const clipsController = require("../controllers/clips-controller");

//get all clips
clipsRoute.get(
  "/",
  clipsController.getClips
  /* #swagger.summary = 'Gets all Clips' */
  /* #swagger.description = 'Gets all Clips from the database' */
  /* #swagger.operationId = 'getClips.' */
  /* #swagger.responses[200] = {
        description: 'Returned all clips successfully.',
        schema: {$ref: '#/definitions/Clips'}
    } */
);

// Get one clip
clipsRoute.get(
  "/:id",
  clipsController.getClip
  /* #swagger.summary = 'Gets a clip by it's Id.' */
  /* #swagger.description = 'Gets a clip by the Id requested from the database.' */
  /* #swagger.operationId = 'getClip' */
  /* #swagger.parameters['id'] = {description: 'Clip Id'} */
  /* #swagger.responses[200] = {
      description: 'Returned clip by Id successfully',
      schema: { $ref: '#/definitions/Clips'}
    } */
);

// Add an clip
clipsRoute.post(
  "/add",
  clipsController.addClip
  /* #swagger.summary = 'Adds a new clip.' */
  /* #swagger.description = 'Adds a new clip to the database .' */
  /* #swagger.operationId = 'addClip' */
  /* #swagger.parameters = [{
      name: 'body', 
      in:'body',
      schema: { $ref: '#/definitions/Clips' }
    }] */
  /* #swagger.responses[200] = {
      description: 'Clip successfully sent to database',
      schema: { $ref: '#/definitions/Clips'}
    }
    */
);

// Edit an clip
clipsRoute.put(
  "/edit/:id",
  clipsController.editClip
  /* #swagger.summary = 'Edits a clip by it's Id.' */
  /* #swagger.description = 'Send updated information about the clip by Id to the database.' */
  /* #swagger.operationId = 'editClip' */
  /* #swagger.parameters = [{
  name: 'body', 
  in:'body',
  schema: { $ref: '#/definitions/Clip' }
}] */
  /* #swagger.responses[200] = {
  description: 'Clip successfully updated',
  schema: { $ref: '#/definitions/Clips'}
}
*/
);

// Delete an clip
clipsRoute.delete(
  "/delete/:id",
  clipsController.deleteClip
  /* #swagger.summary = 'Deletes a clip by Id.' */
  /* #swagger.description = 'Deletes a clip from the database by the clip's Id.' */
  /* #swagger.operationId = 'deleteClip' */
  /* #swagger.responses[200] = {
description: 'Clip successfully deleted',
schema: { $ref: '#/definitions/Clips'}
}
*/
);

module.exports = clipsRoute;
