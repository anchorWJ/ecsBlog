const Joi = require("joi")

exports.schema = {
  login: Joi.object({
    username: Joi.string()
      .max(10)
      .required()
      .error(
        Error("body-username is must be string and under 10 words")
      ),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*\d)[^]{8,16}$/)
      .required()
      .error(
        Error("body-password must be string and has special character and over 8 under 16")
      )
  })
}