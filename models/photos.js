const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const Photograhy = new Schema({
   name: {
      type: String,
      required: true,
   },

   photoDescription: {
      type: String,
   },

   encodedPic: {
      type: String,
      required: true,
   },

   location: {
      type: String,
      required: true,
   },

   user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
   },
   cameraUsed: {
      type: String,
   },
});
