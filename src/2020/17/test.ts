import assert from 'node:assert'
import test from 'node:test'
import { gameOfLife } from '.'
import $ from '../../helpers'

const cycles = 6

test('Day 17 — Sample', () => {
  const grid = $.sample(`
  .#.
  ..#
  ###
  `)

  assert.strictEqual(gameOfLife(grid, cycles), 112)
  assert.strictEqual(gameOfLife(grid, cycles, 4), 848)
})

test('Day 17 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(gameOfLife(input, cycles), 382)
  assert.strictEqual(gameOfLife(input, cycles, 4), 2552)
})
