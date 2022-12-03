// Map over a string character by character to process them with the given
// callback.
// @param {String} string - String to map over
// @param {Function} callback - Callback to execute on every character
const stringMap = (string, callback) =>
  Array.from(string).map(callback).join('')

module.exports = stringMap
