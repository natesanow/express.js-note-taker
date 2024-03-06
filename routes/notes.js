const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile,writeToFile } = require('../helpers/fsutils');

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
        id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
        status: 'success',
        body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting notes');
  }
});

notes.delete('/:id',(req,res) => {
  readFromFile('./db/db.json').then((data) =>{
    let db = JSON.parse(data)
    console.log(db,"Delete",req.params.id)
    let dbList = []
    for(let i=0;i<db.length;i++){
      if(db[i].id !== req.params.id){
        dbList.push(db[i])
      }
    }
    console.log(dbList)
    writeToFile('./db/db.json', dbList)
    res.json(dbList)
  })
})

module.exports = notes