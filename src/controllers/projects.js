require('module-alias/register');
const { request, response } = require('express');
const path = require('path');
const fs = require('fs');
const database = path.join(__dirname, '../database');

const findAllProjects = (req = request, res = response, next) => {
  try {
    const projects = fs.readdirSync(database);
    const files = projects.reduce((acc, project) => {
      acc[project] = fs.readdirSync(
        path.join(__dirname, `../database/${project}`)
      );

      return acc;
    }, {});

    return res.status(200).json(files);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const projectFiles = (req = request, res = response) => {
  try {
    const project = fs.readdirSync(
      path.join(__dirname, `../database/${req.params.name}`)
    );

    return res.status(200).json(project);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const createProject = (req = request, res = response) => {
  try {
    const { project } = req.body;

    if (!fs.existsSync(path.join(__dirname, `../database/${project}`))) {
      fs.mkdirSync(path.join(__dirname, `../database/${project}`));
    }

    return res.status(201).json({ success: true });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { findAllProjects, createProject, projectFiles };
