const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
require("dotenv").config();


mongoose.connect(process.env.MONGO_URI).then(()=>{

   app.use(bodyParser.json()).use('/', require('./routes/index'));

   // Listening port
   const port = process.env.PORT || 3000;

   app.listen(port, () => {
      console.log(`App listening on port ${port}`);

});
})




