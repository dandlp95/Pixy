const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clipSchema = new Schema({
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
    required: true,
  },

  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  cameraUsed: {
    type: String,
  },
  tags: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Clip", clipSchema);
