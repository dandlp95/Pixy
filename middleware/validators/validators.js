const { body } = require("express-validator");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Photo = mongoose.model("Photo");

exports.addUserValidation = [
  body("firstName")
    .notEmpty()
    .withMessage("Please enter a username.")

    .isLength({ max: 40 })
    .withMessage("Name exceeds maximum number of characters"),
  // firstName can't be empty and no longer than 40 characters.

  body("lastName")
    .notEmpty()
    .withMessage("Please enter your last name")
    .isLength({ max: 40 })
    .withMessage("Name exceeds maximum number of characters"),
  /* lastName can't be empty and no longer than 40 characters. */

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
  /* email can't be empty, has to be valid email format, and can't
  be the same as another user's email in the database. */

  body("password")
    .notEmpty()
    .withMessage("Please enter your password")

    .custom((password) => {
      // Minimum eight characters, at least one letter and one number:
      match = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
      if (!match) {
        throw new Error("Invalid password");
      }
      return true;
    })
    .withMessage(
      "Please enter a password of at least 8 characters, 1 letter and 1 number."
    ),
  /* Password can't be empty, needs at leaset 8 characters with 1 letter and
  1 number. */
];

exports.editUserValidation = [
  /* editUserValidation is exactly the same as addUserValidation but all fields
  are optional. Only send the field you want to edit in PUT request. */
  body("firstName")
    .optional({ nullable: true })
    .isLength({ max: 40 })
    .withMessage("Name exceeds maximum number of characters"),

  body("lastName")
    .optional({ nullable: true })
    .isLength({ max: 40 })
    .withMessage("Name exceeds maximum number of characters"),

  body("email")
    .optional({ nullable: true })
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
    .optional({ nullable: true })

    .custom((password) => {
      // Minimum eight characters, at least one letter and one number:
      match = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
      if (!match) {
        throw new Error("Invalid password");
      }
      return true;
    })
    .withMessage(
      "Please enter a password of at least 8 characters, 1 letter and 1 number."
    ),
];

exports.addMediaValidation = [
  body("name")
    .notEmpty()
    .withMessage("Please enter a name for the photograph.")

    .isLength({ max: 300 })
    .withMessage("Maximum number of characters allowed"),
  /* name can't be empty and no longer than 300 characters */

  body("description")
    .optional({ null: true })
    .isLength({ max: 2000 })
    .withMessage("Maximum number of characters exceeded"),
  /* description is an optional value, but if provided, it can't be longer
  than 2000 characters. */

  body("encodedMedia")
    .notEmpty()
    .withMessage("Please upload picture")

    .custom((b64String) => {
      // Checks if string is valid base64:
      match =
        /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(
          b64String
        );
      if (!match) {
        throw new Error("Invalid string");
      }
      return true;
    })
    .withMessage("Please enter a valid base64 string."),
  /* encodedMedia can't be empty and has to be base64 format. */

  body("location")
    .notEmpty()
    .isLength({ max: 200 })
    .withMessage("Maximum number of characters exceeded"),

  /* Location can't be empty and no longer than 200 characters if 
  provided. */

  body("user")
    .custom((user) => {
      return User.findById(user).then((user) => {
        if (!user) {
          return Promise.reject("User doesnt exist.");
        }
      });
    })
    .withMessage("Invalid user Id."),

  /* user has to be a valid string to use as ObjectId and exist in the 
  user collection. */

  body("cameraUsed")
    .optional({ nullable: true })
    .isLength({ max: 200 })
    .withMessage("Maximum number of characters exceeded"),

  /* cameraUsed is optional fied, but can't be longer than 200 characters
  if provided.*/
];

exports.editMediaValidation = [
  /* Almost the same as addMediaValidation with the exception that it will
  throw an error if user field is passed. We don't want to be able to change
  media's userId. */
  body("name")
    .optional({ nullable: true })
    .isLength({ max: 700 })
    .withMessage("Maximum number of characters allowed"),

  body("description")
    .optional({ nullable: true })
    .isLength({ max: 2000 })
    .withMessage("Maximum number of characters exceeded"),

  body("encodedMedia")
    .optional({ nullable: true })
    .notEmpty()
    .withMessage("Please upload picture"),

  body("location")
    .optional({ nullable: true })
    .isLength({ max: 200 })
    .withMessage("Maximum number of characters exceeded"),

  body("user")
    .optional({ nullable: true })
    // Gets triggered if user field is added in body
    .custom((user) => {
      throw new Error("User id can't be changed.");
    })
    .withMessage("User id can't be changed."),

  body("cameraUsed")
    .optional({ nullable: true })
    .isLength({ max: 200 })
    .withMessage("Maximum number of characters exceeded"),
];

exports.addAlbumValidation = [
  body("name")
    .notEmpty()
    .withMessage("Album name is required.")

    .isLength({ max: 200 })
    .withMessage("Maximum number of characters exceeded"),
  /* name is required and can't be longer than 200 characters. */

  body("photos")
    .custom((photos) => {
      if (!Array.isArray(photos)) {
        throw new Error("Not type array.");
      }
      for (let i = 0; i < photos.length; i++) {
        if (mongoose.isValidObjectId(photos[i])) {
          return Photo.findById(photos[i]).then((photo) => {
            if (!photo) {
              return Promise.reject("Photo doesn't exist.");
            }
          });
        }
      }
    })
    .withMessage("Photo Id's not valid."),
  /* photos value needs to be an array, each value inside array needs to
  be a valid ObjectId string, and has to return a photo in the photo database.
  */

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
  /* user field is required, and the id needs to return a user from user 
  collection*/
];

exports.editAlbumValidation = [
  /* Almost the same as addAlbumValidation with the exception that it will
  throw an error if user field is passed. We don't want to be able to change
  media's userId. */
  body("name")
    .optional({ nullable: true })
    .isLength({ max: 200 })
    .withMessage("Maximum number of characters exceeded"),

  body("photos")
    .optional({ nullable: true })
    .custom((photos) => {
      if (!Array.isArray(photos)) {
        throw new Error("Not type array.");
      }
      for (let i = 0; i < photos.length; i++) {
        if (mongoose.isValidObjectId(photos[i])) {
          return Photo.findById(photos[i]).then((photo) => {
            if (!photo) {
              return Promise.reject("Photo doesn't exist.");
            }
          });
        }
      }
    })
    .withMessage("Photo Id's not valid."),

  body("user")
    .optional({ nullable: true })
    .custom((user) => {
      throw new Error("User id can't be changed.");
    })
    .withMessage("User id can't be changed."),
];
