var express = require('express');
var schedule = require('node-schedule');
var http = require('http');
var fs = require('fs');
var dump_url = 'https://raw.githubusercontent.com/zapret-info/z-i/master/dump.csv';

var app = express();
app.use(express.static(__dirname + '/static'));


// app.get('/', function(req, res) {
//     res.send('Hello World');
// });



var j = schedule.scheduleJob('0 * * * * *', function(){
console.log('generating new proxy pac');
var stream = fs.createWriteStream("dump.txt");
stream.once('open', function(fd) {
  stream.write("My 1 row\n");
  stream.write("My 2 row\n");
  stream.end();
});

});

var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Listening on port %d', server.address().port);
});
