const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


const photoSchema = new Schema({
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
   tags: [String]
});

module.exports = mongoose.model('Photo', photoSchema);