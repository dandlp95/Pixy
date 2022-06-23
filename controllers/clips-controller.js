const mongoose = require('mongoose');
const Clip = mongoose.model('Clip');
const ObjectId = require('mongoose').ObjectId; // if this doesn't work it's const ObjectId = require('mongodb').ObjectId;

// Create new clip
exports.addClip = (req, res) => {
   const clip = new Clip(req.body);
   clip
      .save()
      .then((clip) => {
         res.json(clip);
      })
      .catch((err) => {
         throw Error(err);
      });
   console.log('new clip added');
};

// Get all clips
exports.getClips = async (req, res) => {
   const clips = await Clip.find();

   if (clips) {
      res.status(200).json(clips);
      console.log('All Clips! From the clipsController file.');
   } else {
      res.status(500).json(response.error || 'An error occurred while getting the clips list.');
   }
};

// Get Clip By Id
exports.getClip = async (req, res) => {
   const clipId = new ObjectId(req.params.id);
   const result = await Clip.find({ _id: clipId });

   if (result) {
      res.status(200).json(result[0]);
      console.log(`One Clip: ${req.params.id}! From the clipController file.`);
   } else {
      res.status(500).json(response.error || 'An error occurred while getting one clip.');
   }
};

// Edit clip by id
exports.editClip = async (req, res) => {
   const clipId = new ObjectId(req.params.id);
   const clip = {
      // FILL IN FIELDS FROM MODEL HERE
   };

   const result = await Clip.replaceOne({ _id: clipId }, clip);

   if (result) {
      res.status(200).json(result[0]);
      console.log(`Modified Clip: ${req.params.id}! From the clipController file.`);
   } else {
      res.status(500).json(response.error || 'An error occurred while modifing the clip.');
   }

   console.log(clip);
};

// Delete clip by id
exports.deleteClip = async (req, res) => {
   const clipId = new ObjectId(req.params.id);
   const result = await Clip.deleteOne({ _id: clipId });

   if (result) {
      res.status(200).json(result[0]);
      console.log(`Deleted Clip: ${req.params.id}! From the clipController file.`);
   } else {
      res.status(500).json(response.error || 'An error occurred while deleting the clip.');
   }
};
