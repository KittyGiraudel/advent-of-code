const test = require('ava')
const $ = require('../../helpers')
const { maze } = require('./')

test('Day 24 — Sample', t => {
  const sample = $.sample(`
  #.######
  #>>.<^<#
  #.<..<<#
  #>v.><>#
  #<^v^^>#
  ######.#
  `)

  t.is(maze(sample), 18)
  t.is(maze(sample, true), 54)
})

test('Day 24 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(maze(input), 247)
  t.is(maze(input, true), 728)
})
