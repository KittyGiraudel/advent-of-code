import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 07 — Sample', () => {
  const sample = $.sample(`
  32T3K 765
  T55J5 684
  KK677 28
  KTJJT 220
  QQQJA 483
  `)

  assert.strictEqual(run(sample), 6440)
  assert.strictEqual(run(sample, true), 5905)
})

test('Day 07 — Solutions', () => {
  const input = $.readInput(import.meta)
  assert.strictEqual(run(input), 248_422_077)
  assert.strictEqual(run(input, true), 249_817_836)
})
