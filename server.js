const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();


//AuthO code
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
//end AuthO code

//Error Handling
const {
   logError,
   returnError,
 } = require("./middleware/error-handling/errorHandler");
 


//Mongoose schemas
require('./models/users')
require('./models/clips')
require('./models/photos')
require('./models/albums')


//Connecting to mongoDB with mongoose
mongoose.connect(process.env.MONGO_URI).then(() => {
   app.use(bodyParser.json()).use('/', require('./routes/index'));

   // Listening port
   const port = process.env.PORT || 3000;

   app.listen(port, () => {
      console.log(`App listening on port ${port}`);
   });
});
