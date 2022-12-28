const test = require('ava')
const $ = require('../../helpers')
const { find } = require('./')

test('Day 01 — Sample', t => {
  t.is(find([+1, -1]), 0)
  t.is(find([+3, +3, +4, -2, -4]), 10)
  t.is(find([-6, +3, +8, +5, -6]), 5)
  t.is(find([+7, +7, -2, -7, -4]), 14)
})

test('Day 01 — Solutions', t => {
  const input = $.readInput(__dirname).map(Number)

  t.is($.sum(input), 406)
  t.is(find(input), 312)
})
