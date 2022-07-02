const { body } = require("express-validator");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Photo = mongoose.model("Photo");

exports.userValidation = [
  body("firstName")
    .notEmpty()
    .withMessage("Please enter a username.")

    .isLength({ max: 40 })
    .withMessage("Name exceeds maximum number of characters"),

  body("lastName")
    .notEmpty()
    .withMessage("Please enter your last name")
    .isLength({ max: 40 })
    .withMessage("Name exceeds maximum number of characters"),

  body("email")
    .notEmpty()
    .withMessage("Please enter your email address")

    .isEmail()
    .withMessage("Please enter a valid email address")

    .custom((value) => {
      return User.find({ email: value }).then((users) => {
        if (users.length > 0) {
          return Promise.reject("Email is already in use.");
        }
      });
    }),

  body("password")
    .notEmpty()
    .withMessage("Please enter your password")

    .custom((password) => {
      // Minimum eight characters, at least one letter and one number:
      match = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
      if (!match) {
        throw new Error("Invalid password");
      }
    })
    .withMessage(
      "Please enter a password of at least 8 characters, 1 letter and 1 number."
    ),
];

exports.mediaValidation = [
  body("name")
    .notEmpty()
    .withMessage("Please enter a name for the photograph.")

    .isLength({ max: 700 })
    .withMessage("Maximum number of characters allowed"),

  body("description")
    .optional({ null: true })
    .isLength({ max: 2000 })
    .withMessage("Maximum number of characters exceeded"),

  body("encodedMedia")
    .notEmpty()
    .withMessage("Please upload picture")

    .custom((value) => {
      try {
        window.atob(value);
      } catch (e) {
        throw e;
      }
    })
    .withMessage("Not valid base64 string."),

  body("location")
    .notEmpty()
    .isLength({ max: 200 })
    .withMessage("Maximum number of characters exceeded"),

  body("user").custom((user) => {
    return User.findById(user).then((user) => {
      if (!user) {
        return Promise.reject("User doesnt exist.");
      }
    });
  }),

  body("cameraUsed")
    .isLength({ max: 200 })
    .withMessage("Maximum number of characters exceeded"),

  body("tags")
    .isLength({ max: 200 })
    .withMessage("Maximum number of characters exceeded"),
];

exports.albumValidation = [
  body("name")
    .isLength({ max: 200 })
    .withMessage("Maximum number of characters exceeded"),

  body("photos").custom((photos) => {
    photos.forEach((photoId) => {
      var photo = Photo.findById(photoId);
      if (!photo) {
        throw new Error("Photo not found.");
      }
    });
  }),

  body("user")
    .notEmpty()
    .withMessage("User Id required.")

    .custom((userId) => {
      return User.findById(userId).then((user) => {
        if (!user) {
          return Promise.reject("User doesn't exist");
        }
      });
    }),
];
