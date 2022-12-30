import test from 'ava'
import $ from '../../helpers'
import { findPath, findShortestPath } from './'

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
  const input = $.readInput(import.meta)

  t.is(findPath(input), 484)
  t.is(findShortestPath(input), 478)
})
