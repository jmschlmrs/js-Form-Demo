const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + '/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.post('/register', function(req, res) {
    console.log(req.body);
    res.status(200).json(req.body);
});

app.listen('4000', () => {
    console.log('App running at localhost:4000!');
});