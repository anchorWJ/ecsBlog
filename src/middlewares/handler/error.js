/**
 * @type {Custom.IMiddlewareHandler<{bar: number}>}
 */

const errorHandler = (options = {}) => {
  return async(ctx, next) => {
    try {
      await next()
      const { body, status } = ctx
      const isNotFound = status === 404 && !body
      if(isNotFound) {
        ctx.fail("resource was not found", status)
      }
    } catch(error) {
      let { status = 500, message } = error

      const parameterErrorKeyWord = [
        "body",
        "query",
        "param"
      ]

      const isParameterError = parameterErrorKeyWord.some(
        keyword => message.includes(keyword)
      )

      if (isParameterError) {
        status = 400
      }

      const isAuthenticationError = message === "Authentication Error"
      if (isAuthenticationError) {
        message = "Login First!"
      }

      const isProd = ctx.app.env === "production"
      const isSeverError = status === 500
      const isProdServerError = isProd && isSeverError

      const displayableError = [
        isParameterError,
        isAuthenticationError
      ].includes(true)

      if (!displayableError && isProdServerError) {
        ctx.app.emit("error", { message, status })
        message = "Server Error"
      }
      ctx.fail(message, status)
    }
  }
}

module.exports = errorHandler