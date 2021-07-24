const errorHandler = require("./handler/error.js")
const log4JS = require("koa-log4")
const bodyParser = require("koa-body")

module.exports = [
  log4JS.koaLogger(log4JS.getLogger("http"), {
    level: "auto"
  }),
  errorHandler(),
  bodyParser()
]

