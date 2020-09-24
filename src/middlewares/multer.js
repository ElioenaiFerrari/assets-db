const multer = require('multer');
const { request } = require('express');
const path = require('path');

const storage = multer.diskStorage({
  destination({ params } = request, _, cb) {
    cb(null, path.join(__dirname, `../database/${params.project}`));
  },
  filename(_, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.png`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

module.exports = upload;
