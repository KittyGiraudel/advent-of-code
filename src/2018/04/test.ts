import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { find } from './'

test('Day 04 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(find(input), 4716)
  assert.strictEqual(find(input, true), 117_061)
})
