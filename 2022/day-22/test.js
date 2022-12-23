const test = require('ava')
const { maze, rotate, findLastIndex, findFirstIndex } = require('./')
const input = require('../../helpers/readInput')(__dirname, null, false)

const sample = `        ...#
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

10R5L5R10L4R5L5`

test('Day 22 — Sample', t => {
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
  t.is(maze(input), 191010)
  t.is(maze(input, true), 55364)
})
