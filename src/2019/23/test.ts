import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { boot } from './'

test('Day 23 — Solutions', () => {
  const [input] = $.readInput(import.meta)

  assert.strictEqual(boot(input).pop(), 20_160)
  assert.strictEqual(boot(input).shift(), 13_164)
})
