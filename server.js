var express = require('express');
var app = express();
app.use(express.static(__dirname + '/static'));


// app.get('/', function(req, res) {
//     res.send('Hello World');
// });

var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Listening on port %d', server.address().port);
});
