const test = require('ava')
const { inspect } = require('./')
const [input] = require('../../helpers/readInput')(__dirname)

test.skip('Day 25 — Sample', t => {})

test('Day 25 — Solutions', t => {
  t.is(inspect(input), 84410376)
})
