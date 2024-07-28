import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 20 — Sample', () => {
  const sample = $.sample(`
  5-8
  0-2
  4-7
  `)

  assert.strictEqual(run(sample, 9), 3)
  assert.strictEqual(run(sample, 9, true), 2)
})

test('Day 20 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input, 4_294_967_295), 19_449_262)
  assert.strictEqual(run(input, 4_294_967_295, true), 119)
})
