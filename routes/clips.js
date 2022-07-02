// Clips route
const clipsRoute = require('express').Router();
const clipsController = require('../controllers/clips-controller');

clipsRoute.get('/', clipsController.getClips);          // Get all clips
clipsRoute.get('/:id', clipsController.getClip);        // Get one clip
clipsRoute.post('/add-clip/', clipsController.addClip);          // Add an clip
clipsRoute.put('/edit-clip/:id', clipsController.editClip);       // Edit an clip
clipsRoute.delete('/delete-clip/:id', clipsController.deleteClip);  // Delete an clip

module.exports = clipsRoute;