import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 02 — Sample', () => {
  assert.strictEqual(run(['2x3x4']), 58)
  assert.strictEqual(run(['2x3x4'], true), 34)
})

test('Day 02 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 1_586_300)
  assert.strictEqual(run(input, true), 3_737_498)
})
