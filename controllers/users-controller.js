const mongoose = require("mongoose");
const User = mongoose.model("User");
const ObjectId = require("mongoose").ObjectId;

const {
  Api400Error,
  Api404Error,
  Api401Error,
} = require("../middleware/error-handling/ApiErrors");

// Create new user
exports.addUser = (req, res, next) => {
  try {
    const user = new User(req.body);
    user
      .save()
      .then((user) => {
        console.log("new user added");
        res.json(user);
      })
      .catch((err) => {
        const error = new Api400Error(err.message);
        next(error);
      });
  } catch (err) {
    next(err);
  }
};

// Get all users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (users) {
      res.status(200).json(users);
      console.log("All Users! From the usersController file.");
    } else {
      const err404 = new Api404Error("Not found.");
      next(err404);
    }
  } catch (err) {
    next(err);
  }
};

// Get User By Id
exports.getUser = async (req, res, next) => {
  try {
    const result = await User.findById(req.params.id);
    if (result) {
      res.status(200).json(result);
      console.log(`One User: ${req.params.id}! From the userController file.`);
    } else {
      const err404 = new Api404Error("Not found.");
      next(err404);
    }
  } catch (err) {
    next(err);
  }
};

// Edit user by id
exports.editUser = (req, res, next) => {
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };

    for (field in user) {
      if (field === null) {
        delete field;
      }
    }

    User.findByIdAndUpdate(req.params.id, media, (err, doc) => {
      if (err) {
        const err400 = new Api400Error(err.message);
        next(err400);
      } else {
        console.log(doc);
        res.status(200).json(doc);
      }
    });
  } catch (err) {
    next(err);
  }
};

// Delete user by id
exports.deleteUser = (req, res, next) => {
  User.findByIdAndDelete(req.params.id, (err, doc) => {
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
