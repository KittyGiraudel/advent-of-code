import test from 'ava'
import $ from '../../helpers'
import { reduce, findShortestPolymer } from './'

test('Day 05 — Sample', t => {
  t.is(reduce('dabAcCaCBAcCcaDA'), 'dabCBAcaDA')
  t.is(findShortestPolymer('dabAcCaCBAcCcaDA'), 4)
})

test('Day 05 — Solutions', t => {
  const [input] = $.readInput(import.meta)

  t.is(reduce(input).length, 11_364)
  t.is(findShortestPolymer(input), 4212)
})
