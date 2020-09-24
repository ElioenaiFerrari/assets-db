require('module-alias/register');
const { request, response } = require('express');
const requireDir = require('require-dir');
const projects = requireDir('../database', {
  recurse: true,
  duplicates: false,
  extensions: ['.png'],
});

const findAllProjects = (req = request, res = response, next) => {
  try {
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { findAllProjects };
