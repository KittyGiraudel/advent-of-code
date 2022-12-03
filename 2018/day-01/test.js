const test = require('ava')
const $ = require('../../helpers')
const { find } = require('./')
const input = require('../../helpers/readInput')(__dirname).map(Number)

test.skip('Day 1.1', t => {})

test('Day 1.2', t => {
  t.is(find([+1, -1]), 0)
  t.is(find([+3, +3, +4, -2, -4]), 10)
  t.is(find([-6, +3, +8, +5, -6]), 5)
  t.is(find([+7, +7, -2, -7, -4]), 14)
})

test('Day 1 — Solutions', t => {
  t.is($.sum(input), 406)
  t.is(find(input), 312)
})
