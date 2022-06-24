const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const clipSchema = new Schema({
   name: {
      type: String,
      required: true,
   },

   clipDescription: {
      type: String,
   },

   encodedClip: {
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

module.exports = mongoose.model('Clip', clipSchema);