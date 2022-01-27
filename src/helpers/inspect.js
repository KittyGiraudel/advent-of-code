const util = require('util')

const inspect = value => util.inspect(value, true, Infinity, true)

module.exports = inspect
