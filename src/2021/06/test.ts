import test from 'ava'
import $ from '../../helpers'
import { run } from './'

test('Day 06 — Sample', t => {
  const sample = '3,4,3,1,2'

  t.is(run(sample, 18), 26)
  t.is(run(sample, 80), 5934)
  t.is(run(sample, 256), 26_984_457_539)
})

test('Day 06 — Solutions', t => {
  const [input] = $.readInput(import.meta)

  t.is(run(input, 80), 363_101)
  t.is(run(input, 256), 1_644_286_074_024)
})
