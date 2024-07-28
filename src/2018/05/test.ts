import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { findShortestPolymer, reduce } from './'

test('Day 05 — Sample', () => {
  assert.strictEqual(reduce('dabAcCaCBAcCcaDA'), 'dabCBAcaDA')
  assert.strictEqual(findShortestPolymer('dabAcCaCBAcCcaDA'), 4)
})

test('Day 05 — Solutions', () => {
  const [input] = $.readInput(import.meta)

  assert.strictEqual(reduce(input).length, 11_364)
  assert.strictEqual(findShortestPolymer(input), 4212)
})
