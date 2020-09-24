require('module-alias/register');

const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../../public')));
app.set('views', path.join(__dirname, '../../public/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
require('@/router')(app);

module.exports = app;
