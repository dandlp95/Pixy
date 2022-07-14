const mongoose = require("mongoose");
const Album = mongoose.model("Album");
const Photo = mongoose.model("Photo");

const {
  Api400Error,
  Api404Error,
  Api401Error,
} = require("../middleware/error-handling/ApiErrors");
const { validationResult } = require("express-validator");

// Create new album
exports.addAlbum = (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      res.status(422).send(errors.array());
    } else {
      const album = new Album(req.body);
      album
        .save()
        .then((album) => {
          console.log("new album added");
          res.json(album);
        })
        .catch((err) => {
          const error400 = new Api400Error(err.message);
          next(error400);
        });
    }
  } catch (err) {
    next(err);
  }
};

// Get all albums
exports.getAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find({});
    if (albums) {
      res.status(200).json(albums);
      console.log("All Albums! From the albumsController file.");
    } else {
      throw new Api404Error("Not found.");
    }
  } catch (err) {
    next(err);
  }
};

// Get Album By Id
exports.getAlbum = async (req, res, next) => {
  try {
    const result = await Album.findById(req.params.id);

    if (result) {
      // Removes IDs from pictures that are no longer in the db.
      result.photos.forEach(async function (photoId, idx, arr) {
        const photo = await Photo.findById(photoId);
        if (!photo) {
          arr.splice(idx, 1);
        } else {
          console.log(`This is the array now: ${result.photos}`);
        }
      });
      await result.save();
      res.status(200).json(result);

      console.log(
        `One Album: ${req.params.id}! From the albumController file.`
      );
    } else {
      throw new Api404Error("Album not found.");
    }
  } catch (err) {
    const apiError = Api400Error(err.message);
    next(apiError); // throw wont work here because its a "callback"
  }
};

// Edit album by id
exports.editAlbum = (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      res.status(422).send(errors.array());
    } else {
      const album = {
        name: req.body.name,
        photos: req.body.photos,
        user: req.body.user,
        tags: req.body.tags,
      };

      for (field in album) {
        if (field === null) {
          delete field;
        }
      }

      Album.findByIdAndUpdate(req.params.id, album, (err, doc) => {
        if (err) {
          const err400 = new Api400Error(err.message);
          next(err400);
        } else {
          console.log(doc);
          res.status(200).json(doc);
        }
      });
    }
  } catch (err) {
    next(err);
  }
};

// Delete album by id
exports.deleteAlbum = (req, res, next) => {
  Album.findByIdAndDelete(req.params.id, (err, doc) => {
    if (err) {
      const err400 = new Api400Error(err.message);
      next(err400);
    } else {
      if (doc === null) {
        res.status(200).send("Already Deleted.");
      } else {
        res.status(200).json(doc);
      }
    }
  });
};
