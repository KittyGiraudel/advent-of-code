import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 06 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 543_903)
  assert.strictEqual(run(input, true), 14_687_245)
})
