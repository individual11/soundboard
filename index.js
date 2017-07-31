var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs'),
    clips = [],
    stream,
    currentfile,
    order = fs.createWriteStream('./files/order.mp3');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  socket.on('message', function(msg){
    io.emit('message', msg);

    function main() {

        clips = msg

        if (!clips.length) {
            order.end("Done");
            return;
        }
        currentfile = './files/' + clips.shift();
        stream = fs.createReadStream(currentfile);
        stream.pipe(order, {end: false});
        stream.on("end", function() {
            console.log(currentfile + ' appended');
            main();
        });

    }
    main();

  });
});

app.use(express.static(__dirname + '/files'));


http.listen(3000, function(){
  console.log('listening on *:3000');
});
