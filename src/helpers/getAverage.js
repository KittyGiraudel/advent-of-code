const sum = require('./sum')

const getAverage = values => sum(values) / values.length

module.exports = getAverage
