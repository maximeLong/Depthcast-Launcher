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

    //HACK: this should be handled through the store/options handoff
    io.emit('toDepthcastString', 'twitchChannel', window.localStorage.getItem("twitch"));
    store.commit('SET_ALREADY_SCANNED', false);

    //best http doesnt like to digest objects so keep everything in args
    //arg1 = keyword , arg2 = value
    this.io.emit('toDepthcastString', 'greeting', 'hello from store');
    this.io.emit('toDepthcastPing', 'greetingPing');


    //listen to messages from depthcast, parse and save
    socket.on('fromDepthcast', function(data, value) {

      //HACK: this should be handled in components somehow, but individual io listeners break
      if (data == 'scanRoom') {
        if (value == 'scanningStarted') {
          store.commit('SET_CURRENTLY_SCANNING', true)
          if (!store.state.UnitySockets.alreadyScanned) { store.commit('SET_ALREADY_SCANNED', true) }
        } else {
          store.commit('SET_CURRENTLY_SCANNING', false)
        }
      }
      if (data == 'cameraFPS') {store.commit('SET_CAMERA_FPS', value) }
      if (data == 'engineFPS') {store.commit('SET_ENGINE_FPS', value) }

    });
  });

  http.listen(app.get('port'), function(){
    console.log('listening on: ' + app.get('port'));
  });
}
