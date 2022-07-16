// Clips route
const { requiresAuth } = require("express-openid-connect");
const clipsRoute = require("express").Router();
const clipsController = require("../controllers/clips-controller");
const {
  addMediaValidation,
  editMediaValidation,
} = require("../middleware/validators/validators");

//get all clips
clipsRoute.get(
  "/", requiresAuth(),
  clipsController.getClips
  /* #swagger.tags = ['Clips'] */
  /* #swagger.summary = 'Gets all Clips' */
  /* #swagger.description = 'Gets all Clips from the database' */
  /* #swagger.operationId = 'getClips.' */
  /* #swagger.responses[200] = {
        description: 'Returned all clips successfully.',
        schema: {$ref: '#/definitions/Medias'}
    } */
);

// Get one clip
clipsRoute.get(
  "/:id", requiresAuth(),
  clipsController.getClip
  /* #swagger.tags = ['Clips'] */
  /* #swagger.summary = 'Gets a clip by Id.' */
  /* #swagger.description = 'Gets a clip by the Id requested from the database.' */
  /* #swagger.operationId = 'getClip' */
  /* #swagger.parameters['id'] = {description: 'Clip Id'} */
  /* #swagger.responses[200] = {
      description: 'Returned clip by Id successfully',
      schema: { $ref: '#/definitions/Media'}
    } */
);

// Add an clip
clipsRoute.post(
  "/add", requiresAuth(),
  addMediaValidation,
  clipsController.addClip
  /* #swagger.tags = ['Clips'] */
  /* #swagger.summary = 'Adds a new clip.' */
  /* #swagger.description = 'Adds a new clip to the database .' */
  /* #swagger.operationId = 'addClip' */
  /* #swagger.parameters = [{
      name: 'body', 
      in:'body',
      schema: { $ref: '#/definitions/Media' }
    }] */
  /* #swagger.responses[200] = {
      description: 'Clip successfully sent to database',
      schema: { $ref: '#/definitions/Media'}
    }
    */
);

// Edit an clip
clipsRoute.put(
  "/edit/:id", requiresAuth(),
  editMediaValidation,
  clipsController.editClip
  /* #swagger.tags = ['Clips'] */
  /* #swagger.summary = 'Edits a clip by Id.' */
  /* #swagger.description = 'Send updated information about the clip by Id to the database.' */
  /* #swagger.operationId = 'editClip' */
  /* #swagger.parameters = [{
  name: 'body', 
  in:'body',
  schema: { $ref: '#/definitions/Media' }
}] */
  /* #swagger.responses[200] = {
  description: 'Clip successfully updated',
  schema: { $ref: '#/definitions/Media'}
}
*/
);

// Delete an clip
clipsRoute.delete(
  "/delete/:id", requiresAuth(),
  clipsController.deleteClip
  /* #swagger.tags = ['Clips'] */
  /* #swagger.summary = 'Deletes a clip by Id.' */
  /* #swagger.description = 'Deletes a clip from the database by the clip Id.' */
  /* #swagger.operationId = 'deleteClip' */
  /* #swagger.responses[200] = {
description: 'Clip successfully deleted',
schema: { $ref: '#/definitions/Media'}
}
*/
);

module.exports = clipsRoute;
