import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 14 — Sample', t => {
  const sample = $.sample(
    `
    O....#....
    O.OO#....#
    .....##...
    OO.#O....O
    .O.....O#.
    O.#..O.#.#
    ..O..#O..O
    .......O..
    #....###..
    #OO..#....
    `
  )

  t.is(run(sample), 136)
  t.is(run(sample, true), 64)
})

test('Day 14 — Solutions', t => {
  const input = $.readInput(import.meta)
  t.is(run(input), 103333)
  t.is(run(input, true), 97241)
})
