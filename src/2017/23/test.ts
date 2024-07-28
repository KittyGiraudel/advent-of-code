import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run, skip } from './'

test('Day 23 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 3025)
  assert.strictEqual(skip(), 915)
})
