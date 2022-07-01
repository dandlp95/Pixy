const mongoose = require('mongoose');
const Clip = mongoose.model('Clip');
const ObjectId = require('mongoose').ObjectId; // if this doesn't work it's const ObjectId = require('mongodb').ObjectId;

const {
   Api400Error,
   Api404Error,
   Api401Error,
 } = require("../middleware/error-handling/ApiErrors");

// Create new clip
exports.addClip = (req, res) => {
   try {
      const clip = new Clip(req.body);
      clip
         .save()
         .then((clip) => {
            res.json(clip);
         })
         .catch((err) => {
            throw new Api400Error("Bad request.");
         });
      console.log('new clip added');
   } catch (err) {
      next(err);
    }
};

// Get all clips
exports.getClips = async (req, res) => {
   try {
      const clips = await Clip.find();

      if (clips) {
         res.status(200).json(clips);
         console.log('All Clips! From the clipsController file.');
      } else {
         throw new Api404Error("Not found.");
      }
   } catch (err) {
      next(err);
    }
};

// Get Clip By Id
exports.getClip = async (req, res) => {
   try {
      const clipId = new ObjectId(req.params.id);
      const result = await Clip.find({
         _id: clipId
      });

      if (result) {
         res.status(200).json(result[0]);
         console.log(`One Clip: ${req.params.id}! From the clipController file.`);
      } else {
         throw new Api404Error("Not found.");
      }
   } catch (err) {
      next(err);
    }
};

// Edit clip by id
exports.editClip = async (req, res) => {
   try {
      const clipId = new ObjectId(req.params.id);
      const clip = {
         // FILL IN FIELDS FROM MODEL HERE
      };

      const result = await Clip.replaceOne({
         _id: clipId
      }, clip);

      if (result) {
         res.status(200).json(result[0]);
         console.log(`Modified Clip: ${req.params.id}! From the clipController file.`);
      } else {
         res.status(500).json(response.error || 'An error occurred while modifing the clip.');
      }

      console.log(clip);
   } catch (err) {
      next(err);
    }
};

// Delete clip by id
exports.deleteClip = async (req, res) => {
   try {
      const clipId = new ObjectId(req.params.id);
      const result = await Clip.deleteOne({
         _id: clipId
      });

      if (result) {
         res.status(200).json(result[0]);
         console.log(`Deleted Clip: ${req.params.id}! From the clipController file.`);
      } else {
         res.status(500).json(response.error || 'An error occurred while deleting the clip.');
      }
   } catch (err) {
      next(err);
    }
};