const $ = require('../../helpers')

// 1. If the value is a number, return it.
// 2. If the value is an array, recursively walk it.
// 3. If the value is an object (and not null) and doesn’t contain `red` as a
//    value, recursively walk it.
// 4. Otherwise return 0.
const getSum = item => {
  if (typeof item === 'number') return item
  if (Array.isArray(item)) return $.sum(item.map(getSum))
  if (item && typeof item === 'object' && !Object.values(item).includes('red'))
    return Object.keys(item).reduce((acc, key) => acc + getSum(item[key]), 0)
  return 0
}

const run = (input, advanced) =>
  advanced
    ? getSum(JSON.parse(input))
    : $.sum(input.match(/-?\d+/g).map(Number))

module.exports = { run }