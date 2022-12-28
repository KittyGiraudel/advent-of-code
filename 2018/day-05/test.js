const test = require('ava')
const $ = require('../../helpers')
const { reduce, findShortestPolymer } = require('./')

test('Day 05 — Sample', t => {
  t.is(reduce('dabAcCaCBAcCcaDA'), 'dabCBAcaDA')
  t.is(findShortestPolymer('dabAcCaCBAcCcaDA'), 4)
})

test('Day 05 — Solutions', t => {
  const [input] = $.readInput(__dirname)

  t.is(reduce(input).length, 11364)
  t.is(findShortestPolymer(input), 4212)
})
