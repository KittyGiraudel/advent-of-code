import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { countTailPositions } from './'

test('Day 09 — Sample', () => {
  const sample = $.sample(`
  R 4
  U 4
  L 3
  D 1
  R 4
  D 1
  L 5
  R 2
  `)

  assert.strictEqual(countTailPositions(sample), 13)
  assert.strictEqual(countTailPositions(sample, 10), 1)
})

test('Day 09 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(countTailPositions(input), 6087)
  assert.strictEqual(countTailPositions(input, 10), 2493)
})
