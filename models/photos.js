const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  encodedMedia: {
    type: String,
    required: true,
  },

  location: {
    type: String,
  },

  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  cameraUsed: {
    type: String,
  },
  tags: [String],
});

module.exports = mongoose.model("Photo", photoSchema);
