const test = require('ava')
const { play, anchor } = require('.')
const input = 496138527

const getOrder = cups => anchor(cups, 1).join('').slice(1)
test('Day 23.1', t => {
  t.is(getOrder(play('389125467', 10)), '92658374')
  t.is(getOrder(play('389125467', 100)), '67384529')
})

test('Day 23.2', t => {
  t.is(play('389125467', 10_000_000, 1_000_000), '92658374')
})

test('Day 23 — Solutions', t => {
  t.is(getOrder(play('496138527', 100)), '69425837')
})
