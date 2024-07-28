import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 21 — Solutions', () => {
  const [input] = $.readInput(import.meta)

  assert.strictEqual(run(input), 19_351_175)
})
