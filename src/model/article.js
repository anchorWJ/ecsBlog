const { Model, DataTypes } = require("sequelize")
const moment = require('moment');

class Article extends Model {}

module.exports = sequelize => {
  Article.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Title"
      },
      synopsis: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        comment: "Introduce"
      },
      cardImages: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        comment: "Card Image"
      },
      type: {
        type: DataTypes.ENUM,
        values: ["Vue", "Swift", "Flutter", "Python", "Go", "AWS", "Architecture", "Others"],
        allowNull: false,
        comment: "categories[Vue, Swift, Flutter, Python, Go, AWS, Architecture, Others]"
      },
      content: {
        type: DataTypes.TEXT("MEDIUM"),
        allowNull: false,
        comment: "Detail"
      },
      contentImage: {
        type: DataTypes.BLOB("long"),
        comment: "Content Image"
      },
      createdAt: {
      type: DataTypes.STRING,
      defaultValue() {
        return moment().format("YYYY-MM-DD HH:mm")
      }
    },
    updateAt: {
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
  return  Article
}
