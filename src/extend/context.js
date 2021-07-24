const context = {}

const config = require("../config.js")
context.config = config

/**
 * return successfully
 * @param {any} data 
 * @param {number} status 
 */
context.success = function (data, status = 200) {
  const statusIsNumber = typeof status === "number"
  if(!statusIsNumber) {
    throw new Error ("status must be number")
  }
  this.status = status
  this.body = {msg: "success", status, data }
}

/**
 * return failed
 * @param {any} reason  
 * @param {number} status {default 200}
 */
context.fail = function (reason, status = 500) {
  const statusIsNumber = typeof status === "number"
  if(!statusIsNumber) {
    throw new Error ("status must be number")
  }
  this.status = status
  this.body = {msg: "failed", status, reason }
}

const model = require("../model")
context.model = model

module.exports = context