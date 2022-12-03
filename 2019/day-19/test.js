const test = require('ava')
const $ = require('../../helpers')
const { run } = require('./')
const [input] = require('../../helpers/readInput')(__dirname)

test.skip('Day 19.1', t => {})

test.skip('Day 19.2', t => {})

test('Day 19 — Solutions', t => {
  t.is($.countInString(run(input).flat().join(''), '1'), 169)
  // I ended up solving part 2 almost entirely by hand, by approximating the
  // right area, then trying a few number adjustments until finding the right
  // answer.
})
