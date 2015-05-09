process.env.DUMP_URL = process.env.DUMP_URL || 'https://raw.githubusercontent.com/zapret-info/z-i/master/dump.csv'
process.env.PROXYSTRING = process.env.PROXYSTRING || 'SOCKS5 127.0.0.1:9050' // tor proxy
process.env.PROXYPAC_PATH = __dirname + '/static/proxy.pac'

var fs = require('fs')
var path = require('path')
var moment = require('moment')
var schedule = require('node-schedule')
var request = require('request')
var generatePacFile = require('./parser')

generatePacFile(process.env.DUMP_URL)

if (process.argv.indexOf('--once') == -1) {
    var rule = new schedule.RecurrenceRule()
    rule.minute = new schedule.Range(0, 59, 30) // run task every 30 minutes
    schedule.scheduleJob(rule, function() {
        generatePacFile(process.env.DUMP_URL)
    })

    if (process.argv.indexOf('--no-webserver') < 0) {

        var express = require('express')
        var app = express()
        app.use(require('prerender-node').set('prerenderToken', process.env.PRERENDER_TOKEN))


        var server = app.listen(process.env.PORT || 3000, function() { // starting web-server
            console.log('Listening on port %d', server.address().port)
        })


        app.get('/github_readme', function(req, res) { // getting content from github and sending to user
            request('https://raw.githubusercontent.com/Alex0007/proxypac-gen-russia/master/README.md').pipe(res)
        })

        app.get('/proxy.pac', function(req, res) {
            var ip = req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress

            console.log(ip + ': proxypac requested at ' + moment().format('LLL'))

            res.pipe(fs.createWriteStream(path.join(__dirname, '/static', 'proxy.pac')))

        })

        app.use(express.static(__dirname + '/static'))

    }
}
