const test = require('ava')
const $ = require('../../helpers')
const { run } = require('./')

test('Day 16 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(run(input), 373)
  t.is(run(input, true), 260)
})
