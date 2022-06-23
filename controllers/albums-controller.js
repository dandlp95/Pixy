const mongoose = require('mongoose');
const Album = mongoose.model('Album');
const ObjectId = require('mongoose').ObjectId; // if this doesn't work it's const ObjectId = require('mongodb').ObjectId;

// Create new album
exports.addAlbum = (req, res) => {
   const album = new Album(req.body);
   album
      .save()
      .then((album) => {
         res.json(album);
      })
      .catch((err) => {
         throw Error(err);
      });
   console.log('new album added');
};

// Get all albums
exports.getAlbums = async (req, res) => {
   const albums = await Album.find();

   if (albums) {
      res.status(200).json(albums);
      console.log('All Albums! From the albumsController file.');
   } else {
      res.status(500).json(response.error || 'An error occurred while getting the albums list.');
   }
};

// Get Album By Id
exports.getAlbum = async (req, res) => {
   const albumId = new ObjectId(req.params.id);
   const result = await Album.find({ _id: albumId });

   if (result) {
      res.status(200).json(result[0]);
      console.log(`One Album: ${req.params.id}! From the albumController file.`);
   } else {
      res.status(500).json(response.error || 'An error occurred while getting one album.');
   }
};

// Edit album by id
exports.editAlbum = async (req, res) => {
   const albumId = new ObjectId(req.params.id);
   const album = {
      // FILL IN FIELDS FROM MODEL HERE
   };

   const result = await Album.replaceOne({ _id: albumId }, album);

   if (result) {
      res.status(200).json(result[0]);
      console.log(`Modified Album: ${req.params.id}! From the albumController file.`);
   } else {
      res.status(500).json(response.error || 'An error occurred while modifing the album.');
   }

   console.log(album);
};

// Delete album by id
exports.deleteAlbum = async (req, res) => {
   const albumId = new ObjectId(req.params.id);
   const result = await Album.deleteOne({ _id: albumId });

   if (result) {
      res.status(200).json(result[0]);
      console.log(`Deleted Album: ${req.params.id}! From the albumController file.`);
   } else {
      res.status(500).json(response.error || 'An error occurred while deleting the album.');
   }
};
