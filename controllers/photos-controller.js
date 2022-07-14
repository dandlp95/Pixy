const mongoose = require("mongoose");
const Photo = mongoose.model("Photo");
const operations = require("./mediaController");
const Album = mongoose.model("Album");

exports.addPhoto = operations.add(Photo);
exports.getPhotos = operations.getDocs(Photo);
exports.getPhoto = operations.getDocById(Photo);
exports.editPhoto = operations.editMedia(Photo);
exports.deletePhoto = operations.delete(Photo, Album);
