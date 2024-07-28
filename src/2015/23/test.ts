import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 23 — Sample', () => {
  const sample = $.sample(`
  inc a
  jio a, +2
  tpl a
  inc a
  `)

  assert.strictEqual(run(sample).a, 2)
})

test('Day 23 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input).b, 307)
  assert.strictEqual(run(input, 1).b, 160)
})
