var dump_url = 'https://raw.githubusercontent.com/zapret-info/z-i/master/dump.csv';
var proxy_string = 'SOCKS5 127.0.0.1:9050'; //TOR


var fs = require('fs');
var express = require('express');
var schedule = require('node-schedule');
var request = require('request');
var async = require('async');
var moment = require('moment');

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
        //create pac-file
        build_pac(__dirname + '/static/proxy.pac', ips);

    });
}

function build_pac(filename, ips) { // generate .pac-file
    console.log(ips.length);
    var file = fs.createWriteStream(filename);
    file.write('// proxypac_gen_russia, autogenerated on \n');
    file.write('// ' + moment().utc().add('hours', 4).format('LLL') + " (MSK)\n\n");
    file.write('function FindProxyForURL(url, host) {\n  blockedips = [ ');
    file.write('      ];\n\n  if (blockedips.indexOf(dnsResolve(host)) != -1) {\n    return "PROXY proxy.antizapret.prostovpn.org:3128; DIRECT";\n  }\n\n  return "DIRECT";\n}');
    file.end();

}

function generate_pac() {
    console.log('generating new proxy pac');
    //saving file with rkn dump
    var file = fs.createWriteStream("dump.txt");
    var r = request("https://raw.githubusercontent.com/zapret-info/z-i/master/dump.csv").pipe(file);
    r.on("finish", function () {
        // call ip parsing
        find_IP("dump.txt");
    });
}
var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Listening on port %d', server.address().port);
});

schedule.scheduleJob('0 * * * * *', generate_pac);
