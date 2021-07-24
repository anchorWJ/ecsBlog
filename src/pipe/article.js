const Joi = require("joi");
const typeList = ["Vue", "Swift", "Flutter", "Python", "Go", "AWS", "Architecture", "Others"];

exports.schema = {

  index: Joi.object({
    limit: Joi.number()
      .min(0)
      // change me => add a pagination function
      .default(30)
      .error(Error("query-limit must be number, and min must be 0")),
    page: Joi.number()
      .min(1)
      .default(1)
      .error(Error("query-page must be number, and min must be 1")),
    type: Joi.array()
      .empty("")
      .items(Joi.valid(...typeList))
      .single()   // string to array
      .default(["Vue", "Swift", "Flutter", "Python", "Go", "AWS", "Architecture", "Others"])
      .error(Error("query-type must be string, and must belong Swift, AWS, Vue, Kotlin, Python, Others"))
  }),

  show: Joi.object({
    id: Joi.number()
      .required()
      .error(Error("param-id must ber number"))
  }),

  create: Joi.object({
    title: Joi.string()
      .required()
      .error(Error("body-title must be string")),
    synopsis: Joi.string()
    // when default is (""), empty() is necessary
      .empty("")
      .default("")
      .error(Error("body-synopsis must be string")),
    cardImages: Joi.string()
      .empty("")
      .default("")
      .error(Error("body-cardImages must be url string")),
    type: Joi.string()
      .valid(...typeList)
      .required()
      .error(Error("body-type must belong Swift, Flutter, Go, AWS, Vue, Architecture, Python, Others")),
    content: Joi.string()
      .empty("")
      .default("")
      .error(Error("body-content must be string"))
  }),

  update: Joi.object({
    id: Joi.number()
      .required()
      .error(Error("param-id must be number")),
    title: Joi.string()
      .empty("")
      .error(Error("body-title must be string")),
    synopsis: Joi.string()
      .empty("")
      .default("")
      .error(Error("body-synopsis must be string")),
    cardImages: Joi.string()
      .empty("")
      .default("")
      .error(Error("body-cardImages must be url string")),
    type: Joi.string()
      .empty("")
      .valid(...typeList)
      .error(Error("body-type must belong Swift, Flutter, Go, AWS, Vue, Architecture, Python, Others")),
    content: Joi.string()
      .empty("")
      .default("")
      .error(Error("body-content must be string"))
  }),

  destroy: Joi.object({
    id: Joi.number()
      .required()
      .error(Error("param-id must ber number"))
  })
}