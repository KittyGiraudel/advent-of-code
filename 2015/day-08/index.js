const $ = require('../../helpers')

const decode = strings =>
  $.sum(strings.map(raw => raw.length - eval(raw).length))

const encode = strings =>
  $.sum(strings.map(raw => JSON.stringify(raw).length - raw.length))

module.exports = { decode, encode }
