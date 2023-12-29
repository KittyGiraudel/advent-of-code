import test from 'ava'
import $ from '../../helpers'
import { run } from './'

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

  t.is(run(sample), 1656)
  t.is(run(sample, true), 195)
})

test('Day 11 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input), 1661)
  t.is(run(input, true), 334)
})
