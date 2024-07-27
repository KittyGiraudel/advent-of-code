import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 06 — Sample', t => {
  const sample = [0, 2, 7, 0]

  t.is(run(sample)[0], 5)
  t.is(run(sample)[1], 4)
})

test('Day 06 — Solutions', t => {
  const input = $.readInput(import.meta).map(Number)

  t.deepEqual(run(input), [14_029, 2765])
})
