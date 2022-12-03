const test = require('ava')
const { gameOfLife } = require('.')
const input = require('../../helpers/readInput')(__dirname, '\n')

const cycles = 6
const grid = ['.#.', '..#', '###']

test('Day 17.1', t => {
  t.is(gameOfLife(grid, cycles), 112)
})

test('Day 17.2', t => {
  t.is(gameOfLife(grid, cycles, 4), 848)
})

test('Day 17 — Solutions', t => {
  t.is(gameOfLife(input, cycles), 382)
  t.is(gameOfLife(input, cycles, 4), 2552)
})
