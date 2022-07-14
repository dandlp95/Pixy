const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const {
  logErrorMiddleware,
  returnError,
} = require("./middleware/error-handling/errorHandler");


// AuthO code
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

//auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));


//req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
// end AuthO code


// Currently using for CSS
app.use(express.static(__dirname + '/public'))

// Mongoose schemas
require("./models/users");
require("./models/clips");
require("./models/photos");
require("./models/albums");

mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => {
  app
    .use(bodyParser.json())
    .use("/", require("./routes/index"))
    .use(logErrorMiddleware)
    .use(returnError);

  // Listening port
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
