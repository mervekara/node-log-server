"use strict";

let passport = require('passport');

module.exports = (app) => {

  app.get('/auth',
    passport.authenticate('basic', {
      session: false
    }),
    function(req, res) {
      res.json(req.user);
    });

};
