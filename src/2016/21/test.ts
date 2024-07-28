import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run, run2 } from './'

test('Day 21 — Sample', () => {
  const sample = $.sample(`
  swap position 4 with position 0
  swap letter d with letter b
  reverse positions 0 through 4
  rotate left 1 step
  move position 1 to position 4
  move position 3 to position 0
  rotate based on position of letter b
  rotate based on position of letter d
  `)

  assert.strictEqual(run(sample, 'abcde'), 'decab')
})

test('Day 21 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input, 'abcdefgh'), 'gfdhebac')
  assert.strictEqual(run2(input), 'dhaegfbc')
})
