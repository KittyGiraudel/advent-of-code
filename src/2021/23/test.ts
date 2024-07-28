import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 23 — Sample', () => {
  const sample = $.sample(
    `
#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########
  `
  )

  assert.strictEqual(run(sample), 12521)
  assert.strictEqual(run(sample, true), 44169)
})

test('Day 23 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 16508)
  assert.strictEqual(run(input, true), 43626)
})
