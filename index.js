var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/src/renderer.js', function(req, res){
  res.sendFile(__dirname + '/src/renderer.js');
});
app.get('/src/mesh.js', function(req, res){
  res.sendFile(__dirname + '/src/mesh.js');
});
app.get('/src/game.js', function(req, res){
  res.sendFile(__dirname + '/src/game.js');
});
app.get('/clouds1/clouds1_east.bmp',  function(req, res){ res.sendFile(__dirname + '/clouds1/clouds1_east.bmp'); });
app.get('/clouds1/clouds1_west.bmp',  function(req, res){ res.sendFile(__dirname + '/clouds1/clouds1_west.bmp'); });
app.get('/clouds1/clouds1_up.bmp',    function(req, res){ res.sendFile(__dirname + '/clouds1/clouds1_up.bmp'); });
app.get('/clouds1/clouds1_down.bmp',  function(req, res){ res.sendFile(__dirname + '/clouds1/clouds1_down.bmp'); });
app.get('/clouds1/clouds1_north.bmp', function(req, res){ res.sendFile(__dirname + '/clouds1/clouds1_north.bmp'); });
app.get('/clouds1/clouds1_south.bmp', function(req, res){ res.sendFile(__dirname + '/clouds1/clouds1_south.bmp'); });
const http = require('http').Server(app);

//const riversi = require('./src/riversi');
//const Renderer = require('./src/Renderer');
//var renderer = new Renderer();

http.listen(8080);
