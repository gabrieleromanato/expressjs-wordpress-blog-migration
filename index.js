'use strict';

const path = require('path');
const express = require('express');
const app = express();
const helmet = require('helmet');
const port = process.env.PORT || 3000;
const { locals } = require('./config');

const routes = require('./routes');

app.locals = locals;

app.disable('x-powered-by');
app.set('view engine', 'ejs');

app.use(helmet());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/', routes);


app.listen(port);