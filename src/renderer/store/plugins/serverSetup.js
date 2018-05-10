var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

export const serverSetup = (store)=> {

  app.set('port', 3000);
  app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

  // messages have to have a keyword (ie - 'controllerfix', 'twitchchannel', 'roomscan')
  // messages need to have type:     1)ping 2)string 3)int 4)bool 5)object
  // messages have a value:
  io.on('connection', function(socket){

    //best http doesnt like to digest objects so keep everything in args
    //arg1 = keyword , arg2 = value
    io.emit('toDepthcastString', 'greeting', 'hello Depthcast');
    io.emit('toDepthcastPing', 'greetingPing')

    //listen to messages from depthcast, parse and save
    socket.on('fromDepthcast', function(data) {
      console.log(data);
    });
  });

  http.listen(app.get('port'), function(){
    console.log('listening on: ' + app.get('port'));
  });
}
