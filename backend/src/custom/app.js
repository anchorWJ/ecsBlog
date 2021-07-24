const Koa = require('koa')
const routesHandler = require("./handler/routes.js")
const log4JS = require("koa-log4")
const { resolve } = require("path")

class CustomKoa extends Koa {
  /**
   * Bulk registration
   * @param {import("koa").Middleware[]} middlewares 
   */
  useMiddlewares(middlewares = []) {
    middlewares.forEach(this.use, this)
  }

  /**
   * 
   * @param {string} dirPath Automatic registration

   */
  useRouters(dirPath) {
    const dirPathIsString = typeof dirPath === "string"

    if(!dirPathIsString) {
      throw new Error("Router path 'dirPath' must be a string")
    }
    this.use(
      routesHandler({ dirPath })
    )
  }

  /**
   * ctx extend
   * @param {object} props 
   */
  extendContext(props) {
    for (const key in props) {
      if (Object.hasOwnProperty.call(props, key)) {
        const hasProp = Boolean(this.context[key])
        if(hasProp) {
          throw new Error("Source context already has this extend property")
        }
        this.context[key] = props[key];
      }
    }
  }

  /**
   * logger application
   * @param {string} dirPath 
   */
  useLogger(dirPath) {
    const dirPathIsString = typeof dirPath === "string"
    if (!dirPathIsString) {
      throw new Error("log path must be string")
    }
    log4JS.configure({
      pm2: true,
      disableClustering: true,
      appenders: {
        access: {
          type: "dateFile",
          pattern: "-yyyy-MM-dd.log",
          alwaysIncludePattern: true,
          daysToKeep: 60,
          filename: resolve(dirPath, "access/access.log")
        },
        app: {
          type: "dateFile",
          pattern: "-yyyy-MM-dd.log",
          alwaysIncludePattern: true,
          daysToKeep: 60,
          filename: resolve(
            dirPath,
            "application/error.log"
          )
        }
      },
      categories: {
        default: {
          appenders: ["access"],
          level: "info"
        },
        app: {
          appenders: ["app"],
          level: "WARN"
        }
      }
    })

    const applogger = log4JS.getLogger("app")
    this.on("error", err => applogger.error(err))
  }
}

module.exports = CustomKoa