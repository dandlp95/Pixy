const routes = require('express').Router();
const path = require('path');

routes.use('/', require('./swagger'));
routes.use('/users', require('./users'));
routes.use('/photos', require('./photos'));
routes.use('/albums', require('./albums'));
routes.use('/clips', require('./clips'));

module.exports = routes;
