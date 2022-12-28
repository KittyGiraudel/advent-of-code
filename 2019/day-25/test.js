const test = require('ava')
const $ = require('../../helpers')
const { inspect } = require('./')

test('Day 25 — Solutions', t => {
  const [input] = $.readInput(__dirname)

  t.is(inspect(input), 84410376)
})
