var http = require('http');
var express = require('express');
var Promise = require('bluebird');
var request = require('request');

var app = express();
var API_BASE = 'http://services.wine.com/api/beta2/service.svc/JSON/catalog?search=';

app.use(express.static(__dirname + '/../client'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){
  res.sendFile('/index.html');
});

app.get('/api/*', function(req, res){
  var query = req.url.replace('/api/', '');
  // console.log("query: ", query);
  request(API_BASE+query+'&apikey='+process.env.KEY, function(err, response, body){
    // console.log("body that came back: ", body);
    res.send(body);
  });
});

app.listen(process.env.PORT || 3000);
console.log("Listening on port 3000");
