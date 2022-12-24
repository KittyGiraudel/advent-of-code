const test = require('ava')
const { maze } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`.split('\n')

test('Day 24 — Sample', t => {
  t.is(maze(sample), 18)
  t.is(maze(sample, true), 54)
})

test('Day 24 — Solutions', t => {
  t.is(maze(input), 247)
  t.is(maze(input, true), 728)
})
