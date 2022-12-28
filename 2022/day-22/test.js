const test = require('ava')
const { maze, rotate } = require('./')
const $ = require('../../helpers')

test('Day 22 — Sample', t => {
  const sample = $.sample(
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
    null,
    false
  )

  t.is(rotate('>', 'L'), '^')
  t.is(rotate('^', 'L'), '<')
  t.is(rotate('<', 'L'), 'v')
  t.is(rotate('v', 'L'), '>')
  t.is(rotate('>', 'R'), 'v')
  t.is(rotate('v', 'R'), '<')
  t.is(rotate('<', 'R'), '^')
  t.is(rotate('^', 'R'), '>')
  t.is(maze(sample), 6032)
})

test('Day 22 — Solutions', t => {
  const input = $.readInput(__dirname, null, false)

  t.is(maze(input), 191010)
  t.is(maze(input, true), 55364)
})
