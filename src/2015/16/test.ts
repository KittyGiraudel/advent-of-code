import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 16 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 373)
  assert.strictEqual(run(input, true), 260)
})
