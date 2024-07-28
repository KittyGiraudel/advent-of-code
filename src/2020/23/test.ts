import assert from 'node:assert'
import test from 'node:test'
import { getChainValue, play, serializeChain } from '.'
import $ from '../../helpers'

test('Day 23 — Sample', () => {
  const sample = '389125467'.split('').map(Number)

  assert.strictEqual(serializeChain(play(sample, 10)), 92_658_374)
  assert.strictEqual(serializeChain(play(sample, 100)), 67_384_529)
  assert.strictEqual(
    getChainValue(play(sample, 10_000_000, 1_000_000)),
    149_245_887_792
  )
})

test('Day 23 — Solutions', () => {
  const input = $.readInput(import.meta).map(Number)

  assert.strictEqual(serializeChain(play(input, 100)), 69_425_837)
  assert.strictEqual(
    getChainValue(play(input, 10_000_000, 1_000_000)),
    218_882_971_435
  )
})
