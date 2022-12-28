const test = require('ava')
const $ = require('../../helpers')
const { run } = require('./')

test('Day 06 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(run(input), 543903)
  t.is(run(input, true), 14687245)
})
