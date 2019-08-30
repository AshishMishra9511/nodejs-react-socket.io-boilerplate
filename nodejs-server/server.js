'use strict';
require('dotenv').config({path: '.env'});


var express = require('express'),
  app = express(),
  port =  process.env.NS_PORT || 3000,
  controller = require('./controller');

const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(port, () => console.log(`Nodejs Server listening on port ${port}!`));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/testSocketConnection.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

app.route('/ping').get(controller.root);

