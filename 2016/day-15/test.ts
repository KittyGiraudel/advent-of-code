import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 15 — Sample', t => {
  const sample = $.sample(`
  Disc #1 has 5 positions; at time=0, it is at position 4.
  Disc #2 has 2 positions; at time=0, it is at position 1.
  `)

  t.is(run(sample), 5)
})

test('Day 15 — Solutions', t => {
  const input = $.readInput(import.meta)
  const extraDisk = 'Disc #7 has 11 positions; at time=0, it is at position 0.'

  t.is(run(input), 121834)
  t.is(run(input.concat(extraDisk)), 3208099)
})
