import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { Computer } from './'

test('Day 10 — Sample', () => {
  const sample = $.sample(`
  addx 15
  addx -11
  addx 6
  addx -3
  addx 5
  addx -1
  addx -8
  addx 13
  addx 4
  noop
  addx -1
  addx 5
  addx -1
  addx 5
  addx -1
  addx 5
  addx -1
  addx 5
  addx -1
  addx -35
  addx 1
  addx 24
  addx -19
  addx 1
  addx 16
  addx -11
  noop
  noop
  addx 21
  addx -15
  noop
  noop
  addx -3
  addx 9
  addx 1
  addx -3
  addx 8
  addx 1
  addx 5
  noop
  noop
  noop
  noop
  noop
  addx -36
  noop
  addx 1
  addx 7
  noop
  noop
  noop
  addx 2
  addx 6
  noop
  noop
  noop
  noop
  noop
  addx 1
  noop
  noop
  addx 7
  addx 1
  noop
  addx -13
  addx 13
  addx 7
  noop
  addx 1
  addx -33
  noop
  noop
  noop
  addx 2
  noop
  noop
  noop
  addx 8
  noop
  addx -1
  addx 2
  addx 1
  noop
  addx 17
  addx -9
  addx 1
  addx 1
  addx -3
  addx 11
  noop
  noop
  addx 1
  noop
  addx 1
  noop
  noop
  addx -13
  addx -19
  addx 1
  addx 3
  addx 26
  addx -30
  addx 12
  addx -1
  addx 3
  addx 1
  noop
  noop
  noop
  addx -9
  addx 18
  addx 1
  addx 2
  noop
  noop
  addx 9
  noop
  noop
  noop
  addx -1
  addx 2
  addx -37
  addx 1
  addx 3
  noop
  addx 15
  addx -21
  addx 22
  addx -6
  addx 1
  noop
  addx 2
  addx 1
  noop
  addx -10
  noop
  noop
  addx 20
  addx 1
  addx 2
  addx 2
  addx -6
  addx -11
  noop
  noop
  noop
  `)
  const program = new Computer(sample)

  assert.strictEqual(program.strength, 13_140)
  assert.strictEqual(
    program.print(),
    $.sample(
      `
    ##..##..##..##..##..##..##..##..##..##..
    ###...###...###...###...###...###...###.
    ####....####....####....####....####....
    #####.....#####.....#####.....#####.....
    ######......######......######......####
    #######.......#######.......#######.....
    `
    ).join('\n')
  )
})

test('Day 10 — Solutions', () => {
  const input = $.readInput(import.meta)
  const program = new Computer(input)

  assert.strictEqual(program.strength, 15_880)
  assert.strictEqual(
    program.print(),
    $.sample(
      `
    ###..#.....##..####.#..#..##..####..##..
    #..#.#....#..#.#....#.#..#..#....#.#..#.
    #..#.#....#....###..##...#..#...#..#....
    ###..#....#.##.#....#.#..####..#...#.##.
    #....#....#..#.#....#.#..#..#.#....#..#.
    #....####..###.#....#..#.#..#.####..###.
    `
    ).join('\n')
  )
})
