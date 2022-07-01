const routes = require('express').Router();
const path = require('path');

// routes.use('/', require('./home'));
routes.use('/', require('./swagger'));

// Temporary home page for testing
routes.get('/', (req, res) => {
   res.sendFile(path.join(__dirname + '../views/home.html'));
});

routes.use('/users', require('./users'));
routes.use('/photos', require('./photos'));
routes.use('/albums', require('./albums'));
routes.use('/clips', require('./clips'));
routes.use('/profile', require('./profile'));

module.exports = routes;
