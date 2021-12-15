const countInString = (haystack, needle) =>
  Array.from(haystack.matchAll(new RegExp(`(?=(${needle}))`, 'gi'))).length || 0

module.exports = countInString
