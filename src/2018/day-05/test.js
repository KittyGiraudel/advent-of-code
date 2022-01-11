const test = require('ava')
const { reduce, findShortestPolymer } = require('./')
const [input] = require('../../helpers/readInput')(__dirname)

test('Day 5.1', t => {
  t.is(reduce('dabAcCaCBAcCcaDA'), 'dabCBAcaDA')
})

test('Day 5.2', t => {
  t.is(findShortestPolymer('dabAcCaCBAcCcaDA'), 4)
})

test('Day 5 — Solutions', t => {
  t.is(reduce(input).length, 11364)
  t.is(findShortestPolymer(input), 4212)
})
