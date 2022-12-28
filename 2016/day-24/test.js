const test = require('ava')
const $ = require('../../helpers')
const { discover } = require('./')

test('Day 24 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(discover(input), 502)
  t.is(discover(input, true), 724)
})
