const article = require("../controllers/article")
const jwt = require('koa-jwt')
const config = require("../config")

/**
 * @type {Custom.IRouter}
 */
module.exports = router => {
  router.prefix("/api/articles")

  router.use(
    jwt({
      secret: config.SECRET_KEY.TOKEN
    }).unless({
      method: ["GET"]
    })
  )

  router.get("/", article.index)
  router.get("/:id", article.show)
  router.post("/", article.create)
  router.put("/:id", article.update)
  router.del("/:id", article.destroy)
}