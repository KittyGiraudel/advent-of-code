import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { getDistanceToOxygen, getOxygenDuration } from './'

test('Day 15 — Solutions', () => {
  const [input] = $.readInput(import.meta)

  assert.strictEqual(getDistanceToOxygen(input), 220)
  assert.strictEqual(getOxygenDuration(input), 334)
})
