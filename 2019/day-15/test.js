const test = require('ava')
const { getDistanceToOxygen, getOxygenDuration } = require('./')
const [input] = require('../../helpers/readInput')(__dirname)

test.skip('Day 15.1', t => {})

test.skip('Day 15.2', t => {})

test('Day 15 — Solutions', t => {
  t.is(getDistanceToOxygen(input), 220)
  t.is(getOxygenDuration(input), 334)
})
