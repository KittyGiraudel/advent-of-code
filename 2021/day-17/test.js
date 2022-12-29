import test from 'ava'
import $ from '../../helpers'
import {
  getBoundaries,
  findMaxHeight,
  findSuccessfulLaunches,
  isSuccessfulLaunch,
} from './'

test('Day 17 — Sample', t => {
  const sample = `target area: x=20..30, y=-10..-5`
  const boundaries = getBoundaries(sample)

  t.truthy(typeof isSuccessfulLaunch(boundaries, [7, 2]) === 'number')
  t.truthy(typeof isSuccessfulLaunch(boundaries, [6, 3]) === 'number')
  t.truthy(typeof isSuccessfulLaunch(boundaries, [9, 0]) === 'number')
  t.truthy(typeof isSuccessfulLaunch(boundaries, [23, -10]) === 'number')
  t.truthy(typeof isSuccessfulLaunch(boundaries, [20, -10]) === 'number')
  t.is(findMaxHeight(sample), 45)
  t.is(findSuccessfulLaunches(sample).length, 112)

  // Additional test found on Reddit, which is supposed to uncover primitive
  // solutions: https://www.reddit.com/r/adventofcode/comments/rid0g3/2021_day_17_part_1_an_input_that_might_break_your/
  const input = 'target area: x=352..377, y=-49..-30'

  t.is(findMaxHeight(input), 66)
  t.is(findSuccessfulLaunches(input).length, 820)
})

test('Day 17 — Solutions', t => {
  const [input] = $.readInput(import.meta)

  t.is(findMaxHeight(input), 13203)
  t.is(findSuccessfulLaunches(input).length, 5644)
})
