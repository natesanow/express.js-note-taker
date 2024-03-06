const express = require('express');
const app = express();
const path = require('path');
const api = require('./routes/index.js');
const html = require("./routes/html.js")
const PORT = process.env.PORT || 3001;


app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(html)


app.listen(PORT, () =>
  console.log(`App is listening at http://localhost:${PORT}`)
);
