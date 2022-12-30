import test from 'ava'
import $ from '../../helpers'
import { getDistanceToOxygen, getOxygenDuration } from './'

test('Day 15 — Solutions', t => {
  const [input] = $.readInput(import.meta)

  t.is(getDistanceToOxygen(input), 220)
  t.is(getOxygenDuration(input), 334)
})
