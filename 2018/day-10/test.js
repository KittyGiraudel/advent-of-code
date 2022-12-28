const test = require('ava')
const $ = require('../../helpers')
const { plot } = require('./')

test('Day 10 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(plot(input), 10312)
})
