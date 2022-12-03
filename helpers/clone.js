// Deep clone a data structure.
// @param {*} data - Data to clone
// @return {*}
const clone = data => JSON.parse(JSON.stringify(data))

module.exports = clone
