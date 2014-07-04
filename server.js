var express = require('express');
var schedule = require('node-schedule');

var app = express();
app.use(express.static(__dirname + '/static'));


// app.get('/', function(req, res) {
//     res.send('Hello World');
// });

var j = schedule.scheduleJob('0 * * * * *', function(){
    console.log('Time for tea!');
});

var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Listening on port %d', server.address().port);
});
