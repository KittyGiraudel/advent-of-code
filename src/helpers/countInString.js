// Count the number of occurrences of the given needle in the given haystack.
// @param {String} haystack - String to find needle in
// @param {String} needle - String to find in haystack
// @return {Number}
const countInString = (haystack, needle) =>
  Array.from(haystack.matchAll(new RegExp(`(?=(${needle}))`, 'gi'))).length || 0

module.exports = countInString