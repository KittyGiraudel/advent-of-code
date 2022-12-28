const test = require('ava')
const $ = require('../../helpers')
const { run } = require('./')

test('Day 21 — Solutions', t => {
  const [input] = $.readInput(__dirname)

  t.is(run(input), 19351175)
})
