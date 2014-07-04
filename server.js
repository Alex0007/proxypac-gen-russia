var fs = require('fs');
var express = require('express');
var schedule = require('node-schedule');
var request = require('request');

var dump_url = 'https://raw.githubusercontent.com/zapret-info/z-i/master/dump.csv';

var app = express();
app.use(express.static(__dirname + '/static'));


// app.get('/', function(req, res) {
//     res.send('Hello World');
// });

function generate_pac() {
    console.log('generating new proxy pac');
    request('https://raw.githubusercontent.com/zapret-info/z-i/master/dump.csv')
    .pipe(fs.createWriteStream('dump.txt'), function(){console.log("success")});
}

var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Listening on port %d', server.address().port);
});

schedule.scheduleJob('0 * * * * *', generate_pac);
