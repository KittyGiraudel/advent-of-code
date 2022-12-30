import test from 'ava'
import $ from '../../helpers'
import { play, serializeChain, getChainValue } from '.'

test('Day 23 — Sample', t => {
  const sample = '389125467'.split('').map(Number)

  t.is(serializeChain(play(sample, 10)), 92658374)
  t.is(serializeChain(play(sample, 100)), 67384529)
  t.is(getChainValue(play(sample, 10_000_000, 1_000_000)), 149245887792)
})

test('Day 23 — Solutions', t => {
  const input = $.readInput(import.meta).map(Number)

  t.is(serializeChain(play(input, 100)), 69425837)
  t.is(getChainValue(play(input, 10_000_000, 1_000_000)), 218882971435)
})
