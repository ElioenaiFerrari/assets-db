const { request, response } = require('express');

const home = (req = request, res = response, next) => {
  return res.status(200).render('home.html');
};

module.exports = { home };
