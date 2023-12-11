import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 11 — Sample', t => {
  const sample = $.sample(
    `
    ...#......
    .......#..
    #.........
    ..........
    ......#...
    .#........
    .........#
    ..........
    .......#..
    #...#.....
    `
  )

  t.is(run(sample), 374)
  t.is(run(sample, 10), 1030)
  t.is(run(sample, 100), 8410)
})

test('Day 11 — Solutions', t => {
  const input = $.readInput(import.meta)
  t.is(run(input), 9799681)
  t.is(run(input, 1_000_000), 513171773355)
})
