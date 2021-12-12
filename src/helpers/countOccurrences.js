const countOccurrences = array =>
  array.reduce((acc, curr) => {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc
  }, {})

module.exports = countOccurrences
