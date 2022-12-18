const test = require('ava')
const { reduce, findShortestPolymer } = require('./')
const [input] = require('../../helpers/readInput')(__dirname)

test('Day 05 — Sample', t => {
  t.is(reduce('dabAcCaCBAcCcaDA'), 'dabCBAcaDA')
  t.is(findShortestPolymer('dabAcCaCBAcCcaDA'), 4)
})

test('Day 05 — Solutions', t => {
  t.is(reduce(input).length, 11364)
  t.is(findShortestPolymer(input), 4212)
})
