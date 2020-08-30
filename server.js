'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');


var app = express();
var db = require('./app/models/index');

var corsOption = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOption));

// parse request of 'Content-Type' 'application/json

app.use(bodyParser.json());


// parse request of 'content-Type' ' 'application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({extended: true}));

// route

app.get('/', (req, res) => {
    res.json({message: 'Running the application'});
});

require('./app/routes/tutorial.routes')(app);
// set port, listen requests

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});

db.sequelize.sync();


/**
*in development stage use
*db.sequelize.sync({ force: true }).then(() =>{
*   console.log('Drop and re-sync db.');
*});
**/