import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { maze } from './'

test('Day 24 — Sample', () => {
  const sample = $.sample(`
  #.######
  #>>.<^<#
  #.<..<<#
  #>v.><>#
  #<^v^^>#
  ######.#
  `)

  assert.strictEqual(maze(sample), 18)
  assert.strictEqual(maze(sample, true), 54)
})

test('Day 24 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(maze(input), 247)
  assert.strictEqual(maze(input, true), 728)
})
