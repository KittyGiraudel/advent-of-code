import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { getData, run } from './'

test('Day 22 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 960)
  assert.strictEqual(getData(input), 225)
})
