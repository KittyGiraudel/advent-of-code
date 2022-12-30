import test from 'ava'
import $ from '../../helpers'
import { countFish } from './'

test('Day 06 — Sample', t => {
  const sample = `3,4,3,1,2`

  t.is(countFish(sample, 18), 26)
  t.is(countFish(sample, 80), 5934)
  t.is(countFish(sample, 256), 26984457539)
})

test('Day 06 — Solutions', t => {
  const [input] = $.readInput(import.meta)

  t.is(countFish(input, 80), 363101)
  t.is(countFish(input, 256), 1644286074024)
})
