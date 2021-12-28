const sum = require('./sum')

// Return the average value for the given numbers.
// @param {Number[]} values - Numbers to get the average from
// @return {Number}
const getAverage = values => sum(values) / values.length

module.exports = getAverage
