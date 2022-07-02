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
      //const clipId = new ObjectId(req.params.id);
      const clip = {
         name: req.body.name,
         clipDescription: req.body.clipDescription,
         encodedClip: req.body.encodedClip,
         location: req.body.location,
         user: req.body.user,
         cameraUsed: req.body.cameraUsed,
         tags: req.body.tags
      };

      Clip.findByIdAndUpdate(req.params.id, clip, (err, doc) => {
         if (err) {
            next(err);
          } else {
            console.log(doc);
            res.status(200).json(doc);
          }
        });
      console.log(clip);
   } catch (err) {
      next(err);
   }
};

// Delete clip by id
exports.deleteClip = async (req, res) => {
   try {
      Clip.findByIdAndDelete(req.params.id, (err, doc) => {
         if (err) {
           next(err);
         } else {
           if (doc === null) {
             res.status(200).send("Already Deleted.");
           } else {
             res.status(200).json(doc);
           }
         }
       });
   } catch (err) {
      next(err);
   }
};