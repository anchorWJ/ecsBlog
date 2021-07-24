const context = require("./extend/context.js")
const { resolve } = require("path")
const CustomKoa = require("./custom/app.js")
const middlewares = require("./middlewares")
const app = new CustomKoa()

app.useMiddlewares(middlewares)

app.useRouters(resolve(__dirname, "./routers"))

app.extendContext(context)

app.useLogger(resolve(__dirname, "../logs"))

module.exports = { server: app } 