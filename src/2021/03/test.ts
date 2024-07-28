import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 03 — Sample', () => {
  const sample = $.sample(`
  00100
  11110
  10110
  10111
  10101
  01111
  00111
  11100
  10000
  11001
  00010
  01010
  `)

  assert.strictEqual(run(sample), 198)
  assert.strictEqual(run(sample, true), 230)
})

test('Day 03 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 4_103_154)
  assert.strictEqual(run(input, true), 4_245_351)
})
