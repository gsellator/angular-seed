var express = require('express');

// App Setup
var app = express(),
    fs = require('fs');

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('../client'));

// Helpers
var padStr = function(i) {
    return (i < 10) ? "0" + i : "" + i;
}

// Routes
app.get('/', function(req, res) {
    res.render('../client/index.html');
});

app.get('/home', function(req, res) {
    res.render('home.ejs');
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !')
});

app.listen(3110);