import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { plot } from './'

test('Day 10 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(plot(input), 10_312)
})
