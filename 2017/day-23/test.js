const test = require('ava')
const $ = require('../../helpers')
const { run, skip } = require('./')

test('Day 23 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(run(input), 3025)
  t.is(skip(input), 915)
})
