import test from 'ava'
import $ from '../../helpers'
import { countFlashes, findSynchronocity } from './'

test('Day 11 — Sample', t => {
  const sample = $.sample(`
  5483143223
  2745854711
  5264556173
  6141336146
  6357385478
  4167524645
  2176841721
  6882881134
  4846848554
  5283751526
  `)

  t.is(countFlashes(sample, 100), 1656)
  t.is(findSynchronocity(sample), 195)
})

test('Day 11 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(countFlashes(input, 100), 1661)
  t.is(findSynchronocity(input), 334)
})
