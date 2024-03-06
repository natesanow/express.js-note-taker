const app = require('express').Router()

const notesRouter = require('./notes');

//const app = express();

app.use('/notes', notesRouter);

module.exports = app;