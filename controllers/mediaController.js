// Since clips and photographs will have the exact same logic for
// the controllers, I made a single controller that can  be used for both.

// Additionally, it can also be used for other controllers that may share
// the same logic

const {
  Api400Error,
  Api404Error,
  Api401Error,
} = require("../middleware/error-handling/ApiErrors");

operations = {};
const { validationResult } = require("express-validator");

// Create new clip
operations.add = (Schema) => {
  return (req, res, next) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        res.status(422).send(errors.array());
      } else {
        const newDoc = new Schema(req.body);
        newDoc
          .save()
          .then((doc) => {
            console.log("new document added");
            res.json(doc);
          })
          .catch((err) => {
            const error = new Api400Error(err.message);
            next(error);
          });
      }
    } catch (err) {
      next(err);
    }
  };
};

// Get all clips
operations.getDocs = (Schema) => {
  return async (req, res, next) => {
    try {
      const docs = await Schema.find();
      if (docs) {
        res.status(200).json(docs);
        console.log("All docs returned");
      } else {
        const err404 = new Api404Error("Not found.");
        next(err404);
      }
    } catch (err) {
      next(err);
    }
  };
};

// Get Clip By Id
operations.getDocById = (Schema) => {
  return async (req, res, next) => {
    try {
      const doc = await Schema.findById(req.params.id);
      if (doc) {
        res.status(200).json(doc);
        console.log(`One doc: ${req.params.id}!`);
      } else {
        const err404 = new Api404Error("Not found.");
        next(err404);
      }
    } catch (err) {
      next(err);
    }
  };
};

// Edit clip by id
operations.editMedia = (Schema) => {
  return (req, res, next) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        res.status(422).send(errors.array());
      } else {
        //const clipId = new ObjectId(req.params.id);
        const media = {
          name: req.body.name,
          clipDescription: req.body.clipDescription,
          encodedClip: req.body.encodedClip,
          location: req.body.location,
          user: req.body.user,
          cameraUsed: req.body.cameraUsed,
          tags: req.body.tags,
        };

        for (field in media) {
          if (field === null) {
            delete field;
          }
        }

        Schema.findByIdAndUpdate(req.params.id, media, (err, doc) => {
          if (err) {
            const err400 = new Api400Error(err.message);
            next(err400);
          } else {
            console.log(doc);
            res.status(200).json(doc);
          }
        });
      }
    } catch (err) {
      next(err);
    }
  };
};

// Delete clip by id
operations.delete = (Schema) => {
  return async (req, res, next) => {
    Schema.findByIdAndDelete(req.params.id, (err, doc) => {
      if (err) {
        const err400 = new Api400Error(err.message);
        next(err400);
      } else {
        if (doc === null) {
          res.status(200).send("Already Deleted.");
        } else {
          res.status(200).json(doc);
        }
      }
    });
  };
};

module.exports = operations;
