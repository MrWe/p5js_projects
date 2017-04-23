var express = require('express');

var app = express();

var server = app.listen(process.env.PORT || 3000, listen);

function listen(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://' + host + ':' + port);
}


app.use(express.static('public'));


var io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('Socket:', socket.id, 'connected');
  socket.on('player', function(payload){
    socket.broadcast.emit('otherPlayers', payload);
  });
});
