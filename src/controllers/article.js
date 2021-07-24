const { schema } = require('../pipe/article.js');

/**
 * @type {Custom.Controller}
 */
module.exports = {

  async index(ctx, next) {
    console.log(ctx.query)
    const { limit, page, type } = await schema.index.validateAsync(ctx.query)

    const offset = limit * (page - 1)

    const articles = await ctx.model.Article.findAndCountAll({
      limit,
      offset,
      order: [["id", "DESC"]],
      where: { type }
    })
    ctx.success(articles)
    await next
  },

  async show(ctx, next) {
    const { id } = await schema.show.validateAsync(ctx.params)
    const article = await ctx.model.Article.findByPk(id, {
      include: {
        model: ctx.model.User,
        attributes: { exclude:["password"] }
      }
    })

    if(!article) {
      return ctx.success("article is not found, confirm your article ID", 404)
    }
    ctx.success(article)
  },

  async create(ctx, next) {
    const { id: user_id } = ctx.state.user
    const newInfo = await schema.create.validateAsync(ctx.request.body)
    const article = await ctx.model.Article.create({
      ...newInfo,
      UserId: user_id
    })

    ctx.success(article)
    await next()
  },

  async update(ctx, next) {
    const { id: user_id } = ctx.state.user
    const { id, ...newInfo } = await schema.update.validateAsync({
      ...ctx.params,
      ...ctx.request.body
    })

    const article = await ctx.model.Article.findByPk(id)

    if(!article) {
      return ctx.fail("article can not found, confirm your ID", 400)
    }

    const userIdIsEqual = article.UserId === user_id

    if(!userIdIsEqual) {
      return ctx.fail("you have no right to update article", 401)
    }

    await article.update(newInfo)

    ctx.success(article, 201)
    await next()
  },

  async destroy(ctx, next) {
    const { id: user_id } = ctx.state.user
    const { id } = await schema.destroy.validateAsync(ctx.params)
    const article = await ctx.model.Article.findByPk(id)

    if(!article) {
      return ctx.fail("delete fail, article can not found", 400)
    }

    const userIdIsEqual = article.UserId === user_id
    if(!userIdIsEqual) {
      return ctx.fail("you have no right to delete article", 401)
    }

    await article.destroy()

    ctx.success(null, 204)
    await next()
  }
}