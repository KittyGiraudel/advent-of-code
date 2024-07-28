import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { discover } from './'

test('Day 24 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(discover(input), 502)
  assert.strictEqual(discover(input, true), 724)
})
