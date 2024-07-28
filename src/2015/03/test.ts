import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 03 — Sample', () => {
  assert.strictEqual(run('^v^v^v^v^v'), 2)
  assert.strictEqual(run('^v^v^v^v^v', true), 11)
})

test('Day 01 — Solutions', () => {
  const [input] = $.readInput(import.meta)

  assert.strictEqual(run(input), 2565)
  assert.strictEqual(run(input, true), 2639)
})
