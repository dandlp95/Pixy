const mongoose = require('mongoose');
const User = mongoose.model('User');
const ObjectId = require('mongoose').ObjectId; // if this doesn't work it's const ObjectId = require('mongodb').ObjectId;

// Create new user
exports.addUser = (req, res) => {
   const user = new User(req.body);
   user
      .save()
      .then((user) => {
         res.json(user);
      })
      .catch((err) => {
         throw Error(err);
      });
   console.log('new user added');
};

// Get all users
exports.getUsers = async (req, res) => {
   const users = await User.find();

   if (users) {
      res.status(200).json(users);
      console.log('All Users! From the usersController file.');
   } else {
      res.status(500).json(response.error || 'An error occurred while getting the users list.');
   }
};

// Get User By Id
exports.getUser = async (req, res) => {
   const userId = new ObjectId(req.params.id);
   const result = await User.find({ _id: userId });

   if (result) {
      res.status(200).json(result[0]);
      console.log(`One User: ${req.params.id}! From the userController file.`);
   } else {
      res.status(500).json(response.error || 'An error occurred while getting one user.');
   }
}; 

// Edit user by id
exports.editUser = async (req, res) => {
   const userId = new ObjectId(req.params.id);
   const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
   };

   const result = await User.replaceOne({ _id: userId }, user);

   if (result) {
      res.status(200).json(result[0]);
      console.log(`Modified User: ${req.params.id}! From the userController file.`);
   } else {
      res.status(500).json(response.error || 'An error occurred while modifing the user.');
   }

   console.log(user);
};

// Delete user by id
exports.deleteUser = async (req, res) => {
   const userId = new ObjectId(req.params.id);
   const result = await User.deleteOne({ _id: userId });

   if (result) {
      res.status(200).json(result[0]);
      console.log(`Deleted User: ${req.params.id}! From the userController file.`);
   } else {
      res.status(500).json(response.error || 'An error occurred while deleting the user.');
   }
};
