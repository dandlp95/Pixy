// Albums Route
const albumsRoute = require('express').Router();
const albumsController = require('../controllers/albums-controller.');

albumsRoute.get('/', albumsController.getAlbums);          // Get all albums
albumsRoute.get('/:id', albumsController.getAlbum);        // Get one album
albumsRoute.post('/', albumsController.addAlbum);          // Add an album
albumsRoute.put('/:id', albumsController.editAlbum);       // Edit an album
albumsRoute.delete('/:id', albumsController.deleteAlbum);  // Delete an album

module.exports = albumsRoutes;