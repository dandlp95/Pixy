const routes = require('express').Router();
const path = require('path');

routes.use('/', require('./home'));
routes.use('/api-docs', require('./swagger'));
routes.use('/users', require('./users'));
routes.use('/photos', require('./photos'));
routes.use('/albums', require('./albums'));
routes.use('/clips', require('./clips'));
routes.use('/profile', require('./profile'));

module.exports = routes;
