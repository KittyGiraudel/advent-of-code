import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 01 — Solutions', () => {
  const [input] = $.readInput(import.meta)

  assert.deepStrictEqual(run(input), [232, 1783])
})
