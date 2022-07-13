// const mongoose = require("mongoose");
// const Photo = mongoose.model("Photo");
// const operations = require("./mediaController");

import mongoose from 'mongoose';
const Photo = mongoose.model("Photo");
import operations from '../controllers/mediaController'

exports.addPhoto = operations.add(Photo);
exports.getPhotos = operations.getDocs(Photo);
exports.getPhoto = operations.getDocById(Photo);
exports.editPhoto = operations.editMedia(Photo);
exports.deletePhoto = operations.delete(Photo);

export default {
  addPhoto,
  getPhotos,
  getPhoto,
  editPhoto,
  deletePhoto
}