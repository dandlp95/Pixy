const mongoose = require('mongoose');
const Photo = mongoose.model('Photo');
const ObjectId = require('mongoose').ObjectId; // if this doesn't work it's const ObjectId = require('mongodb').ObjectId;

const {
   Api400Error,
   Api404Error,
   Api401Error,
} = require("../middleware/error-handling/ApiErrors");

// Create new photo
exports.addPhoto = (req, res) => {
   try {
      const photo = new Photo(req.body);
      photo
         .save()
         .then((photo) => {
            res.json(photo);
         })
         .catch((err) => {
            throw new Api400Error("Bad request.");
         });
      console.log('new photo added');
   } catch (err) {
      next(err);
   }
};

// Get all photos
exports.getPhotos = async (req, res) => {
   try {
      const photos = await Photo.find();

      if (photos) {
         res.status(200).json(photos);
         console.log('All Photos! From the photosController file.');
      } else {
         throw new Api404Error("Not found.");
      }
   } catch (err) {
      next(err);
   }
};

// Get Photo By Id
exports.getPhoto = async (req, res) => {
   try {
      const photoId = new ObjectId(req.params.id);
      const result = await Photo.find({
         _id: photoId
      });

      if (result) {
         res.status(200).json(result[0]);
         console.log(`One Photo: ${req.params.id}! From the photoController file.`);
      } else {
         throw new Api404Error("Not found.");
      }
   } catch (err) {
      next(err);
   }
};

// Edit photo by id
exports.editPhoto = async (req, res) => {
   try {
      const photoId = new ObjectId(req.params.id);
      const photo = {
         // FILL IN FIELDS FROM MODEL HERE
      };

      const result = await Photo.replaceOne({
         _id: photoId
      }, photo);

      if (result) {
         res.status(200).json(result[0]);
         console.log(`Modified Photo: ${req.params.id}! From the photoController file.`);
      } else {
         res.status(500).json(response.error || 'An error occurred while modifing the photo.');
      }

      console.log(photo);
   } catch (err) {
      next(err);
   }
};

// Delete photo by id
exports.deletePhoto = async (req, res) => {
   try {
      const photoId = new ObjectId(req.params.id);
      const result = await Photo.deleteOne({
         _id: photoId
      });

      if (result) {
         res.status(200).json(result[0]);
         console.log(`Deleted Photo: ${req.params.id}! From the photoController file.`);
      } else {
         res.status(500).json(response.error || 'An error occurred while deleting the photo.');
      }
   } catch (err) {
      next(err);
   }
};