// Clips route
const clipsRoute = require('express').Router();
const clipsController = require('../controllers/clips-controller');

clipsRoute.get('/', clipsController.getClips);          // Get all clips
clipsRoute.get('/:id', clipsController.getClip);        // Get one clip
clipsRoute.post('/', clipsController.addClip);          // Add an clip
clipsRoute.put('/:id', clipsController.editClip);       // Edit an clip
clipsRoute.delete('/:id', clipsController.deleteClip);  // Delete an clip

module.exports = clipsRoute;