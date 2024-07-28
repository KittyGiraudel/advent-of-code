import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 01 — Sample', () => {
  assert.strictEqual(run([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]), 7)
  assert.strictEqual(
    run([199, 200, 208, 210, 200, 207, 240, 269, 260, 263], true),
    5
  )
})

test('Day 01 — Solutions', () => {
  const input = $.readInput(import.meta).map(Number)

  assert.strictEqual(run(input), 1681)
  assert.strictEqual(run(input, true), 1704)
})
