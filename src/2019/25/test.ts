import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { inspect } from './'

test('Day 25 — Solutions', () => {
  const [input] = $.readInput(import.meta)

  assert.strictEqual(inspect(input), 84_410_376)
})
