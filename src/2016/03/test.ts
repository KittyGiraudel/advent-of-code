import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 03 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 862)
  assert.strictEqual(run(input, true), 1577)
})
