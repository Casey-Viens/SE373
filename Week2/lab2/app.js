var express = require('express')
var app = express()
var path = require('path')
var port = 3000



app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
})

app.get('/index', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
})

app.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/about.html'));
})

app.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/form.html'));
})

app.get('/results', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/results.html'));
})

app.use(express.static(__dirname + "/views"))

app.listen(port, function () {
    console.log("Connected at port: " + port);
})