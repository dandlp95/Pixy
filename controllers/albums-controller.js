const mongoose = require("mongoose");
const Album = mongoose.model("Album");

const {
  Api400Error,
  Api404Error,
  Api401Error,
} = require("../middleware/error-handling/ApiErrors");

// Create new album
exports.addAlbum = (req, res) => {
  try {
    const album = new Album(req.body);
    album
      .save()
      .then((album) => {
        res.json(album);
      })
      .catch((err) => {
        throw new Api400Error("Bad request.");
      });
    console.log("new album added");
  } catch (err) {
    next(err);
  }
};

// Get all albums
exports.getAlbums = async (req, res) => {
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
exports.getAlbum = async (req, res) => {
  try {
    const result = await Album.findById(req.params.id);
    if (result) {
      res.status(200).json(result);
      console.log(
        `One Album: ${req.params.id}! From the albumController file.`
      );
    } else {
      throw new Api404Error("Album not found.");
    }
  } catch (err) {
    next(err);
  }
};

// Edit album by id
exports.editAlbum = (req, res) => {
  try {
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

    Album.findByIdAndUpdate(req.arams.id, album, (err, doc) => {
      if (err) {
        next(err);
      } else {
        console.log(doc);
        res.status(200).json(doc);
      }
    });
  } catch (err) {
    next(err);
  }
};

// Delete album by id
exports.deleteAlbum = (req, res) => {
  try {
    Album.findByIdAndDelete(req.params.id, (err, doc) => {
      if (err) {
        next(err);
      } else {
        if (doc === null) {
          res.status(200).send("Already Deleted.");
        } else {
          res.status(200).json(doc);
        }
      }
    });
  } catch (err) {
    next(err);
  }
};