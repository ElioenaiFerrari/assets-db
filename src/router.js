require('module-alias/index');
const router = require('express').Router();
const { photos } = require('@/controllers/upload');
const { home } = require('./controllers/view');
const multer = require('multer');
const { findAllProjects } = require('./controllers/projects');

const upload = multer({ dest: `./database/` });

router.post('/api/uploads/photos', upload.array('photos', 20), photos);
router.get('/api/projects', findAllProjects);
router.get('/app', home);

module.exports = (app) => app.use(router);
