var fs = require('fs');
var express = require('express');
var schedule = require('node-schedule');
var request = require('request');
var async = require('async');

var dump_url = 'https://raw.githubusercontent.com/zapret-info/z-i/master/dump.csv';

var app = express();
app.use(express.static(__dirname + '/static'));


// app.get('/', function(req, res) {
//     res.send('Hello World');
// });

function find_IP(filename) {
    //parse ip adresses from file
    console.log("file saved succesfully");
    console.log("finding ips");
    var fs = require('fs')
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var re = /(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]);/g;
        var ips = data.match(re);
        for (var key in ips) {
            ips[key] = ips[key].slice(0, -1);
        }
        console.log(ips);

        //create pac-file
        build_pac("1");

    });
}

function build_pac(filename) {
    console.log("last");
}

function generate_pac() {
    console.log('generating new proxy pac');

    //saving file with rkn dump
    var file = fs.createWriteStream("dump.txt");
    var r = request("https://raw.githubusercontent.com/zapret-info/z-i/master/dump.csv").pipe(file);
    r.on("finish", function () {
        //parse_ip
        find_IP("dump.txt");
    });
}
var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Listening on port %d', server.address().port);
});

schedule.scheduleJob('0 * * * * *', generate_pac);
