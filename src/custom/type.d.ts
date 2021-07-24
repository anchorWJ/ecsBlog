import Router = require("@koa/router")
import { Middleware } from "koa"
import  extendContext = require("../extend/context.js")

interface IMiddleware extends Middleware {}

interface IMiddlewareHandler<O = {}> {
  (options: O): IMiddleware
}

interface IRouter {
  (router: Router): void
}

type DefaultControllerTypes = "index" | "show" | "create" | "update" | "destroy"

type Controller< U = {} > = {
  [P in DefaultControllerTypes | U]? : IMiddleware
}

declare module "koa" {
  type extendContextExtends = typeof extendContext
  interface DefaultContext extends extendContextExtends, Router.RouterParamContext {}
}

export as namespace Custom