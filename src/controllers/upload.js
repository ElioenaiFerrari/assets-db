const { request, response } = require('express');

const files = (req = request, res = response, next) => {
  return res.status(200).json(req.files);
};

module.exports = { files };
