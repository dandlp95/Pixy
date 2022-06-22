const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require("bcryptjs")


//User schema with polite error messages and validation
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: 'Please enter your first name.'
    },
    lastName: {
        type: String,
        trim: true,
        required: 'Please enter your last name.'
    },
    email: {
        type: String,
        trim: true,
        required: 'Please enter your email.',
        unique: [true, 'That email address is already is use']
        
   
    },
    password: {
        type: String,
        trim: true,
        required: 'Please enter your password.'
    }

});

//Code to hash the password.
userSchema.pre("save", function (next) {
    const user = this
  
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(user.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
  
            user.password = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
  })

module.exports = mongoose.model('User', userSchema);