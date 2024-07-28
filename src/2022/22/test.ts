import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { maze, rotate } from './'

test('Day 22 — Sample', () => {
  const [sample] = $.sample(
    `
            ...#
            .#..
            #...
            ....
    ...#.......#
    ........#...
    ..#....#....
    ..........#.
            ...#....
            .....#..
            .#......
            ......#.

    10R5L5R10L4R5L5
  `,
    { delimiter: '', trim: false }
  )

  assert.strictEqual(rotate('>', 'L'), '^')
  assert.strictEqual(rotate('^', 'L'), '<')
  assert.strictEqual(rotate('<', 'L'), 'v')
  assert.strictEqual(rotate('v', 'L'), '>')
  assert.strictEqual(rotate('>', 'R'), 'v')
  assert.strictEqual(rotate('v', 'R'), '<')
  assert.strictEqual(rotate('<', 'R'), '^')
  assert.strictEqual(rotate('^', 'R'), '>')
  assert.strictEqual(maze(sample), 6032)
})

test('Day 22 — Solutions', () => {
  const [input] = $.readInput(import.meta, {
    delimiter: '',
    trim: false,
  })

  assert.strictEqual(maze(input), 191_010)
  assert.strictEqual(maze(input, true), 55_364)
})
