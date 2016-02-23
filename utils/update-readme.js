import request from 'request'
import path from 'path'
import fs from 'fs'

export default function () {
  request.get('https://raw.githubusercontent.com/Alex0007/proxypac-gen-russia/master/README.md', (err, resp, body) => {
    if (!err) {
      fs.createWriteStream(path.resolve('public', 'README.md')).write(body)
    }
  })
}
