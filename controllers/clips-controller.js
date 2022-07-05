const mongoose = require("mongoose");
const Clip = mongoose.model("Clip");
const operations = require("./mediaController");

exports.addClip = operations.add(Clip);
exports.getClips = operations.getDocs(Clip);
exports.getClip = operations.getDocById(Clip);
exports.editClip = operations.editMedia(Clip);
exports.deleteClip = operations.delete(Clip);
