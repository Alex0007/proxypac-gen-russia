import Koa from 'koa'
import send from 'koa-send'
import path from 'path'

import generatePacFile from '../utils/parse'
import updateReadme from '../utils/update-readme'

const app = new Koa()

app.use(async function (ctx, next) {
  if (ctx.path === '/') { ctx.path = 'index.html' }
  await send(ctx, ctx.path, { root: path.resolve('public') })
})

process.env.PORT && app.listen(process.env.PORT)


generatePacFile()
updateReadme()

setInterval(() => {
  generatePacFile()
  updateReadme()
}, 1000 * 60 * 60 * 2)
