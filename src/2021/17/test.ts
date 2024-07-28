import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { getBoundaries, isSuccessfulLaunch, run } from './'

test('Day 17 — Sample', () => {
  const sample = 'target area: x=20..30, y=-10..-5'
  const boundaries = getBoundaries(sample)

  assert.ok(typeof isSuccessfulLaunch(boundaries, [7, 2]) === 'number')
  assert.ok(typeof isSuccessfulLaunch(boundaries, [6, 3]) === 'number')
  assert.ok(typeof isSuccessfulLaunch(boundaries, [9, 0]) === 'number')
  assert.ok(typeof isSuccessfulLaunch(boundaries, [23, -10]) === 'number')
  assert.ok(typeof isSuccessfulLaunch(boundaries, [20, -10]) === 'number')
  assert.strictEqual(run(sample), 45)
  assert.strictEqual(run(sample, true), 112)

  // Additional test found on Reddit, which is supposed to uncover primitive
  // solutions: https://www.reddit.com/r/adventofcode/comments/rid0g3/2021_day_17_part_1_an_input_that_might_break_your/
  const input = 'target area: x=352..377, y=-49..-30'

  assert.strictEqual(run(input), 66)
  assert.strictEqual(run(input, true), 820)
})

test('Day 17 — Solutions', () => {
  const [input] = $.readInput(import.meta)

  assert.strictEqual(run(input), 13_203)
  assert.strictEqual(run(input, true), 5644)
})
