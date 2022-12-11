const sum = require('./sum')

// Return the average value for the given numbers.
// @param {Number[]} values - Numbers to get the average from
// @return {Number}
const average = values => sum(values) / values.length

module.exports = average