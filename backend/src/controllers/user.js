const { sha256Hash } = require("../tool/hash.js")
const { schema } = require("../pipe/user.js")
const jsonwebtoken = require('jsonwebtoken');

/**
 * @type {Custom.Controller<"login">}
 */
module.exports = {
  async login(ctx, next) {
    const { username, password } = await schema.login.validateAsync(ctx.request.body)
  
    const user = await ctx.model.User.findOne({
      where: { username }
    })

    if (!user) {
      return ctx.fail("user is not exist, please confirm again", 400)
    }

    const passwordIsEqual = user.password === sha256Hash(password, ctx.config.SECRET_KEY.PASSWORD)

    if(!passwordIsEqual) {
      return ctx.fail("password is fail, please confirm again", 400)
    }

    const payload = {
      id: user.id,
      username: user.username
    }

    const token = jsonwebtoken.sign(
      payload, 
      ctx.config.SECRET_KEY.TOKEN, 
      { expiresIn: "7d"}
    )

    ctx.success({ ...payload, token })
    await next()
  }
}