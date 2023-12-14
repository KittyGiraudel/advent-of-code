import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 21 — Sample', t => {
  const sample = $.sample(`
  ../.# => ##./#../...
  .#./..#/### => #..#/..../..../#..#
  `)

  t.is(run(sample, 2), 12)
})

test('Day 21 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input, 5), 197)
  t.is(run(input, 18), 3_081_737)
})
