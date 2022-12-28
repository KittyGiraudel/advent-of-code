const test = require('ava')
const $ = require('../../helpers')
const { getDistanceToOxygen, getOxygenDuration } = require('./')

test('Day 15 — Solutions', t => {
  const [input] = $.readInput(__dirname)

  t.is(getDistanceToOxygen(input), 220)
  t.is(getOxygenDuration(input), 334)
})
