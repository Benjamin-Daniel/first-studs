require('dotenv').config();
var express = require('express'),
    port = process.env.PORT || '3003',
    path = require('path'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    expressLayouts = require('express-ejs-layouts');

var app = express(),
    router = require('./app/routes'),
    Secret = process.env.SECRET || "qwerty",
    DB_URI = process.env.DB_URI;

//connect to the mongodb server

mongoose.connect(process.env.DB_URI, { useMongoClient: true, }, function (err) {
    if (err) {
        return console.log(err);
    }

    return console.log("Succesfully connected to MongoDB");
});


// configure
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

// tell node where to find our static files
app.use(express.static(__dirname + '/public'));

//set ejs as our templating engine
app.set('view engine', 'ejs');

// if i was using a layout
// app.use(expressLayouts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//set the routes
app.use(router);

// 404 handler
app.use(function (req, res) {
    res.status(404).render('404');
});

// start the server
app.listen(port, () => {
    console.log(`app listening on http://loalhost:${port}`);
});

module.exports = app;
