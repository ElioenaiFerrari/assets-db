const { request, response } = require('@/config/app');

const photos = (req = request, res = response, next) => {
  return res.status(200).json(req.files);
};

module.exports = { photos };
