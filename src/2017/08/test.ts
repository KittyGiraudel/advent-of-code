import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 08 — Sample', () => {
  const sample = $.sample(`
  b inc 5 if a > 1
  a inc 1 if b < 5
  c dec -10 if a >= 1
  c inc -20 if c == 10
  `)

  assert.strictEqual(run(sample).currentMax, 1)
  assert.strictEqual(run(sample).absoluteMax, 10)
})

test('Day 08 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input).currentMax, 6061)
  assert.strictEqual(run(input).absoluteMax, 6696)
})
