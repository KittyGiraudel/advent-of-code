import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 07 — Sample', t => {
  const sample = $.sample(`
  32T3K 765
  T55J5 684
  KK677 28
  KTJJT 220
  QQQJA 483
  `)

  t.is(run(sample), 6440)
  t.is(run(sample, true), 5905)
})

test('Day 07 — Solutions', t => {
  const input = $.readInput(import.meta)
  t.is(run(input), 248_422_077)
  t.is(run(input, true), 249_817_836)
})
