const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  //Should be an array of photo id's?
  photos: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Photo",
    },
  ],

  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },

  tags: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Album", albumSchema);
