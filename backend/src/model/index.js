const { Sequelize } = require('sequelize')
const useUser = require('./user.js')
const useArticle = require('./article.js');
const config = require('../config.js');
const moment = require('moment');

const sequelize = new Sequelize({
  ...config.MODEL,
  hooks: {
    beforeUpdate(instance) {
      instance.set("updateAt", moment().format("YYYY-MM-DD HH:mm"))
    }
  }
})

const User = useUser(sequelize)
const Article = useArticle(sequelize)

User.hasMany(Article)
Article.belongsTo(User)

sequelize.sync({ alter: true })

;(async () => {
  const user = await User.findOne({
    where: { username: "kyaputen"}
  })

  if (user) {
    return
  }

  await User.create({
    username: "kyaputen",
    password: "wsimple1028"
  })
})()

module.exports = {
  User,
  Article
}