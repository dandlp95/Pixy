// Albums Route
const albumsRoute = require('express').Router();
const albumsController = require('../controllers/albums-controller');

albumsRoute.get('/', albumsController.getAlbums);          // Get all albums
albumsRoute.get('/:id', albumsController.getAlbum);        // Get one album
albumsRoute.post('/add', albumsController.addAlbum);          // Add an album
albumsRoute.put('/edit/:id', albumsController.editAlbum);       // Edit an album
albumsRoute.delete('/delete/:id', albumsController.deleteAlbum);  // Delete an album

module.exports = albumsRoute;