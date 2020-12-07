// Parse a restriction line into a type and an array of possible sub-types.
// @param {String} restriction - Unparsed restriction
// @return {Object} Type and capacity
const parseRestriction = restriction => {
  const [type, leftover] = restriction.trim().split(' bags contain ')
  const contains = leftover
    .split(',')
    .map(part => part.trim().match(/(\d+) ([\w\s]+) bags?/))
    .filter(Boolean)
    .map(([, count, type]) => ({ type, count: +count }))

  return { type, contains }
}

// Transform an array of restrictions into an object mapping types to their
// possible sub-types.
// @param {String[]} restrictions - Array of unparsed restrictions
// @return {Object} Map of restrictions
const mapRestrictions = restrictions =>
  restrictions
    .filter(Boolean)
    .map(parseRestriction)
    .reduce((map, { type, contains }) => ({ ...map, [type]: contains }), {})

// Determine whether `entry` type can contain `expected` type, no matter the
// depth.
// @param {Object} map - Map of restrictions
// @param {String} entry - Entry point type in the map
// @param {String} expected - Expected type to find
// @return {Boolean} Whether `entry` type can contain `expected` type (deep)
const canContain = (map, entry, expected) =>
  entry === expected ||
  map[entry].some(item => canContain(map, item.type, expected))

// Count how many different types can contain `expected` type
// @param {Object} map - Map of restrictions
// @param {String} expected - Expected type to find
// @return {Number} Amount of containers for `expected` type
const countContainers = (map, expected) =>
  Object.keys(map)
    .filter(type => type !== expected)
    .filter(type => canContain(map, type, expected)).length

// Count how many bags there are within given `entry` type (deep).
// @param {Object} map - Map of restrictions
// @param {String} entry - Entry point type in the map
// @return {Number} Amount of bags within given `entry` type
const countBagsWithin = (map, entry) =>
  map[entry].reduce(
    (acc, { count, type }) => acc + count * (1 + countBagsWithin(map, type)),
    0
  )

module.exports = {
  canContain,
  countBagsWithin,
  countContainers,
  mapRestrictions,
  parseRestriction,
}
