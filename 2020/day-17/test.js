import test from 'ava'
import $ from '../../helpers'
import { gameOfLife } from '.'

const cycles = 6

test('Day 17 — Sample', t => {
  const grid = $.sample(`
  .#.
  ..#
  ###
  `)

  t.is(gameOfLife(grid, cycles), 112)
  t.is(gameOfLife(grid, cycles, 4), 848)
})

test('Day 17 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(gameOfLife(input, cycles), 382)
  t.is(gameOfLife(input, cycles, 4), 2552)
})
