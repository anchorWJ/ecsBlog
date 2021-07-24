const config = {}

config.PORT = 3000

/**
 * @type {import("sequelize").Options}
 */
 config.MODEL = {
  dialect: "mysql",
  logging: console.log,
  port: 3306,
  database: "anchorBlog",
  username: "admin",
  password: "wjh1994101",
  host: "anchorblog.cisb4qsld0g5.ap-northeast-1.rds.amazonaws.com",
  dialectOptions: {
    ssl: "Amazon RDS"
  },
  pool: {
    max: 100,
    min: 0,
    idle: 200000,
    acquire: 1000000,
  }
}

config.SECRET_KEY = {
  PASSWORD: "QAZWSX!@#$%^123456",
  TOKEN: "QWERTYUIOP!@#$%^&*()_+"
}

module.exports = config