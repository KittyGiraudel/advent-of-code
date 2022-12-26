const test = require('ava')
const { discover } = require('./')
const input = require('../../helpers/readInput')(__dirname)

test.skip('Day 24 — Sample', t => {})

test('Day 24 — Solutions', t => {
  t.is(discover(input), 502)
  t.is(discover(input, true), 724)
})
