var app = require('express')();
var http = require('http').Server(app);
export var io = require('socket.io')(http);

export const serverSetup = (store)=> {

  app.set('port', 3000);
  app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

  this.io = io;

  // messages have to have a keyword (ie - 'controllerfix', 'twitchchannel', 'roomscan')
  // messages need to have type:     1)ping 2)string 3)int 4)bool 5)object
  // messages have a value:
  this.io.on('connection', (socket)=> {

    //best http doesnt like to digest objects so keep everything in args
    //arg1 = keyword , arg2 = value
    this.io.emit('toDepthcastString', 'greeting', 'hello Depthcast');
    this.io.emit('toDepthcastPing', 'greetingPing');


    //listen to messages from depthcast, parse and save
    socket.on('fromDepthcast', function(data) {
      console.log(data);
    });
  });

  http.listen(app.get('port'), function(){
    console.log('listening on: ' + app.get('port'));
  });
}
