import test from 'ava'
import $ from '../../helpers'
import { breakWeakness, findWeakness } from './'

test('Day 09 — Sample', t => {
  const sample =
    '35,20,15,25,47,40,62,55,65,95,102,117,150,182,127,219,299,277,309,576'
      .split(',')
      .map(Number)

  t.is(findWeakness(sample, 5), 127)
  t.is(breakWeakness(sample, 5), 62)
})

test('Day 09 — Solutions', t => {
  const input = $.readInput(import.meta).map(Number)

  t.is(findWeakness(input, 25), 41_682_220)
  t.is(breakWeakness(input, 25), 5_388_976)
})
