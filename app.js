const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

// We want to use JSON to send post request to our application
app.use(bodyParser.json());

// We tell express to serve the folder public as static content
app.use(express.static('public'));

app.get('/public');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/play', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/play.html'))
})

app.get('/stats', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/stats.html'))
})

app.get('/rules', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/rules.html'))
})

app.listen(port, () => console.log(`Listening on port ${port}!`));