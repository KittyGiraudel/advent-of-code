const test = require('ava')
const $ = require('../../helpers')
const { run } = require('./')

test('Day 19 — Solutions', t => {
  const [input] = $.readInput(__dirname)

  t.is($.countInString(run(input).flat().join(''), '1'), 169)
  // I ended up solving part 2 almost entirely by hand, by approximating the
  // right area, then trying a few number adjustments until finding the right
  // answer.
})
