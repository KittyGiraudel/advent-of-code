const test = require('ava')
const $ = require('../../helpers')
const { run } = require('./')

test('Day 03 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.deepEqual(run(input), [862, 1577])
})
