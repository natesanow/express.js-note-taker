const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsutils');

// GET Route for retrieving all the feedback
notes.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting notes
notes.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
        title,
        text,
        notes_id: uuidv4(),
    };

    readAndAppend(newNote, '.db/db.json');

    const response = {
        status: 'success',
        body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting notes');
  }
});

module.exports = notes