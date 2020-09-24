require('module-alias/register');
const router = require('express').Router();
const { files } = require('@/controllers/upload');
const { home } = require('@/controllers/view');
const { findAllProjects } = require('@/controllers/projects');
const upload = require('@/middlewares/multer');

router.post('/api/uploads/:project', upload.array('file', 20), files);
router.get('/api/projects', findAllProjects);
router.get('/app', home);

module.exports = (app) => app.use(router);
