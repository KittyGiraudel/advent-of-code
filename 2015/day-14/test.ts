import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 14 — Sample', t => {
  const sample = $.sample(`
  Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
  Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.
  `)

  t.is(run(sample, 1000)[0], 1120)
  t.is(run(sample, 1000)[1], 689)
})

test('Day 14 — Solutions', t => {
  const input = $.readInput(import.meta)

  t.deepEqual(run(input, 2503), [2655, 1059])
})
