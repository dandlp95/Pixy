const mongoose = require('mongoose');
const User = mongoose.model('User');
const ObjectId = require('mongoose').ObjectId;

const {
   Api400Error,
   Api404Error,
   Api401Error,
 } = require("../middleware/error-handling/ApiErrors");

// Create new user
exports.addUser = (req, res) => {
   try {
      const user = new User(req.body);
      user
         .save()
         .then((user) => {
            res.json(user);
         })
         .catch((err) => {
            throw new Api400Error("Bad request.");
         });
      console.log('new user added');
   } catch (err) {
      next(err);
    }
};

// Get all users
exports.getUsers = async (req, res) => {
   try {
      const users = await User.find();

      if (users) {
         res.status(200).json(users);
         console.log('All Users! From the usersController file.');
      } else {
         throw new Api404Error("Not found.");
      }
   } catch (err) {
      next(err);
    }
};

// Get User By Id
exports.getUser = async (req, res) => {
   try {
      const userId = new ObjectId(req.params.id);
      const result = await User.find({
         _id: userId
      });

      if (result) {
         res.status(200).json(result[0]);
         console.log(`One User: ${req.params.id}! From the userController file.`);
      } else {
         throw new Api404Error("Album not found.");
      }
   } catch (err) {
      next(err);
    }
};

// Edit user by id
exports.editUser = async (req, res) => {
   try {
      const userId = new ObjectId(req.params.id);
      const user = {
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email,
         password: req.body.password,
      };

      const result = await User.replaceOne({
         _id: userId
      }, user);

      if (result) {
         res.status(200).json(result[0]);
         console.log(`Modified User: ${req.params.id}! From the userController file.`);
      } else {
         res.status(500).json(response.error || 'An error occurred while modifing the user.');
      }

      console.log(user);
   } catch (err) {
      next(err);
    }
};

// Delete user by id
exports.deleteUser = async (req, res) => {
   try {
      const userId = new ObjectId(req.params.id);
      const result = await User.deleteOne({
         _id: userId
      });

      if (result) {
         res.status(200).json(result[0]);
         console.log(`Deleted User: ${req.params.id}! From the userController file.`);
      } else {
         res.status(500).json(response.error || 'An error occurred while deleting the user.');
      }
   } catch (err) {
      next(err);
    }
};