const $ = require('../../helpers')

const getArrangements = (numbers, target, curr = []) => {
  if ($.sum(curr) === target) return [curr]
  if ($.sum(curr) > target) return []

  return numbers.reduce((acc, n, index) => {
    const nextNumbers = numbers.slice(index + 1)
    const set = getArrangements(nextNumbers, target, [...curr, n])

    return acc.concat(set)
  }, [])
}

const run = (input, target) => {
  const arrangements = getArrangements(input, target)
  const min = Math.min(...arrangements.map(a => a.length))

  return [
    arrangements.length,
    arrangements.filter(a => a.length === min).length,
  ]
}

module.exports = { run }
