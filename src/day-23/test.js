const test = require('ava')
const { play, serialiseChain, getChainValue } = require('.')
const input = require('../helpers/readInput')(__dirname).map(Number)
const example = '389125467'.split('').map(Number)

test('Day 23.1', t => {
  t.is(serialiseChain(play(example, 10)), 92658374)
  t.is(serialiseChain(play(example, 100)), 67384529)
})

test('Day 23.2', t => {
  t.is(getChainValue(play(example, 10_000_000, 1_000_000)), 149245887792)
})

test('Day 23 — Solutions', t => {
  t.is(serialiseChain(play(input, 100)), 69425837)
  t.is(getChainValue(play(input, 10_000_000, 1_000_000)), 218882971435)
})
