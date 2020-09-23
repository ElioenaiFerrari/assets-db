const { request, response } = require('@/config/app');

const home = (req = request, res = response, next) => {
  return res.status(200).render('index.html');
};

module.exports = { home };
