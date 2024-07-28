import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { scan } from './'

test('Day 16 — Sample', () => {
  const sample = $.sample(`
  x=495, y=2..7
  y=7, x=495..501
  x=501, y=3..7
  x=498, y=2..4
  x=506, y=1..2
  x=498, y=10..13
  x=504, y=10..13
  y=13, x=498..504
  `)
  const counts = scan(sample)

  assert.strictEqual(counts[0] + counts[1], 57)
  assert.strictEqual(counts[0], 29)
})

test('Day 16 — Solutions', () => {
  const input = $.readInput(import.meta)
  const counts = scan(input)

  assert.strictEqual(counts[0] + counts[1], 41_027)
  assert.strictEqual(counts[0], 34_214)
})
