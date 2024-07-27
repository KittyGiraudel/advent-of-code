import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 15 — Sample', t => {
  const sample = $.sample(`
  1163751742
  1381373672
  2136511328
  3694931569
  7463417111
  1319128137
  1359912421
  3125421639
  1293138521
  2311944581
  `)

  t.is(run(sample), 40)
  t.is(run(sample, 5), 315)
})

test('Day 15 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input), 361)
  t.is(run(input, 5), 2838)
})
