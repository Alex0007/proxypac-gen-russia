import fs from 'fs'
import path from 'path'
import moment from 'moment'
import schedule from 'node-schedule'
import request from 'request'
import generatePacFile from '../utils/parse'

// var fs = require('fs')
// var path = require('path')
// var moment = require('moment')
// var schedule = require('node-schedule')
// var request = require('request')
// var generatePacFile = require('../utils/parse')

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

        if (process.env.PRERENDER_TOKEN) app.use(require('prerender-node').set('prerenderToken', process.env.PRERENDER_TOKEN))

        var server = app.listen(process.env.PORT || 3000, function() {
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

            fs.createReadStream(path.join(__dirname, '/static', 'proxy.pac')).pipe(res)

        })

        app.use(express.static(__dirname + '/static'))

    }
}
