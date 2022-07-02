// Photos route
const photosRoute = require('express').Router();
const photosController = require('../controllers/photos-controller');

photosRoute.get('/', photosController.getPhotos);          // Get all photos
photosRoute.get('/:id', photosController.getPhoto);        // Get one photo
photosRoute.post('/add-photo/', photosController.addPhoto);          // Add an photo
photosRoute.put('/edit-photo/:id', photosController.editPhoto);       // Edit an photo
photosRoute.delete('/delete-photo/:id', photosController.deletePhoto);  // Delete an photo

module.exports = photosRoute;