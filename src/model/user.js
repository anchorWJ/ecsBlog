const { Model, DataTypes } = require("sequelize")
const moment = require('moment')
const { sha256Hash } = require('../tool/hash.js')
const config = require("../config.js")

class User extends Model {}

module.exports = sequelize => {
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "User Name"
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Password",
      set(val) {
        const newVal = sha256Hash(
          val,
          config.SECRET_KEY.PASSWORD
        )
        this.setDataValue("password", newVal)
      }
    },
    createdAt: {
      type: DataTypes.STRING,
      defaultValue() {
        return moment().format("YYYY-MM-DD HH:mm")
      }
    }
  },
  {
    sequelize,
    timestamps: false
  })
  return User
}