const { requiresAuth } = require('express-openid-connect');
const routes = require('express').Router();

routes.get('/', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = routes  