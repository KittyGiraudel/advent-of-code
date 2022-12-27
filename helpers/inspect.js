const util = require('util')

const inspect = (value, showHidden = true, depth = Infinity, color = true) =>
  util.inspect(value, showHidden, depth, color)

module.exports = inspect
