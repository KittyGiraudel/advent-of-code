const updateAtIndex = require('../helpers/updateAtIndex')

// If the rule contains a pipe, wrap it in a non-capturing group as it needs to
// be scoped to be meaningful on its one. The group has to be non-capturing to
// avoid a “too many captures” error, and to speed up compilation.
// @param {String} rule - Rule to wrap
// @return {String}
const wrap = rule => (rule.includes('|') ? '(?:' + rule + ')' : rule)

// Recursively resolve a rule by replacing its numbers by their associated rules
// in the map. The depth parameter is used for part 2, and arbitrarily scoped to
// 4, the minimum depth needed to resolve the puzzle. Not my finest work.
// @param {String} rule - Rule to resolve
// @param {Map} map - Storage map
// @param {Number} depth - Internal depth parameter; do not fill
// @return {String}
const resolveRule = (rule, map, depth = 0) =>
  rule.replace(/\d+/g, match =>
    depth > 4 ? match : wrap(resolveRule(map.get(+match), map, depth + 1))
  )

// Get the resolved regular expression for the rules, applying fixes beforehand
// if any.
// @param {String} input - Raw rules input
// @param {Object} fixes - Object of fixes (line -> fixed line)
// @return {String}
const getRegularExpression = (input, fixes) => {
  const map = input
    .replace(/"/g, '')
    .split('\n')
    .map(line => (line in fixes ? fixes[line] : line))
    .map(line => line.match(/^(\d+): (.+)$/))
    .reduce((acc, match) => acc.set(+match[1], match[2]), new Map())

  for (let [key, value] of map.entries()) {
    map.set(key, resolveRule(value, map))
  }

  return new RegExp('^' + map.get(0).replace(/\s+/g, '') + '$')
}

// Count the amount of messages matching rules.
// @param {String} rules - Raw block of rules
// @param {String} input - Raw block of messages
// @param {Object} fixes - Object of fixes (line -> fixed line)
// @return {Number}
const count = (rules, input, fixes = {}) => {
  const expression = getRegularExpression(rules, fixes)

  return input.split('\n').filter(message => expression.test(message)).length
}

module.exports = { count }
