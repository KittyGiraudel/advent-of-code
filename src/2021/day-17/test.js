const test = require('ava')
const {
  getBoundaries,
  findMaxHeight,
  findSuccessfulLaunches,
  isSuccessfulLaunch,
} = require('./')
const [input] = require('../../helpers/readInput')(__dirname)

const sample = `target area: x=20..30, y=-10..-5`

test('Day 17.1', t => {
  const boundaries = getBoundaries(sample)
  t.truthy(typeof isSuccessfulLaunch(boundaries, [7, 2]) === 'number')
  t.truthy(typeof isSuccessfulLaunch(boundaries, [6, 3]) === 'number')
  t.truthy(typeof isSuccessfulLaunch(boundaries, [9, 0]) === 'number')
  t.truthy(typeof isSuccessfulLaunch(boundaries, [23, -10]) === 'number')
  t.truthy(typeof isSuccessfulLaunch(boundaries, [20, -10]) === 'number')
  t.is(findMaxHeight(sample), 45)
})

test('Day 17.2', t => {
  t.is(findSuccessfulLaunches(sample).length, 112)
})

test('Day 17 — Solutions', t => {
  t.is(findMaxHeight(input), 13203)
  t.is(findSuccessfulLaunches(input).length, 5644)
})

// Additional test found on Reddit, which is supposed to uncover primitive
// solutions: https://www.reddit.com/r/adventofcode/comments/rid0g3/2021_day_17_part_1_an_input_that_might_break_your/
test('Day 17 — Additional test', t => {
  const input = 'target area: x=352..377, y=-49..-30'

  t.is(findMaxHeight(input), 66)
  t.is(findSuccessfulLaunches(input).length, 820)
})
