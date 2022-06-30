const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Home Page')
});

module.exports = routes  