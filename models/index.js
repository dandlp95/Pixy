const config = require('../db/config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = config.url;
db.moods = require('./moods.js')(mongoose);
db.users = require('./users.js')(mongoose);

module.exports = db;