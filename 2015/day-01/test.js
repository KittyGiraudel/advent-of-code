const test = require('ava')
const $ = require('../../helpers')
const { run } = require('./')

test('Day 01 — Solutions', t => {
  const [input] = $.readInput(__dirname)

  t.deepEqual(run(input), [232, 1783])
})
