const test = require('ava')
const $ = require('../../helpers')
const { findPath, findShortestPath } = require('./')

test('Day 12 — Sample', t => {
  const sample = $.sample(`
  Sabqponm
  abcryxxl
  accszExk
  acctuvwj
  abdefghi
  `)

  t.is(findPath(sample), 31)
  t.is(findShortestPath(sample), 29)
})

test('Day 12 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.is(findPath(input), 484)
  t.is(findShortestPath(input), 478)
})
