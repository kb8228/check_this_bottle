var express = require('express');
var Promise = require('bluebird');
var request = require('request');
var ENV = require('../.env');

var app = express();
var API_BASE = 'http://services.wine.com/api/beta2/service.svc/JSON/catalog?search=';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/*', function(req, res){
  var query = req.url.replace('/api/', '');
  console.log("query: ", query);
  request(API_BASE+query+'&apikey='+ENV(), function(err, response, body){
    console.log("body that came back: ", body);
    res.send(body);
  });
});

app.listen(3000);