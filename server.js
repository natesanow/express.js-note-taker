const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const exp = require('constants');

const PORT = process.env.port || 3001;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));


