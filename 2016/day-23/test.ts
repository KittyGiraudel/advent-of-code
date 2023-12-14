import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 23 — Sample', t => {
  const sample = $.sample(`
  cpy 2 a
  tgl a
  tgl a
  tgl a
  cpy 1 a
  dec a
  dec a
  `)

  t.is(run(sample), 3)
})

test('Day 23 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.is(run(input, 7), 11_739)
  // t.is(run(input, 12), 479_008_299) // Takes several minutes…
})
