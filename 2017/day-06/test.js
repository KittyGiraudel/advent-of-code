const test = require('ava')
const { run } = require('./')
const $ = require('../../helpers')

test('Day 06 — Sample', t => {
  const sample = [0, 2, 7, 0]

  t.is(run(sample)[0], 5)
  t.is(run(sample)[1], 4)
})

test('Day 06 — Solutions', t => {
  const input = $.readInput(__dirname).map(Number)

  t.deepEqual(run(input), [14029, 2765])
})
