import test from 'ava'
import $ from '../../helpers'
import { getFuelConsumption, getIncrementalFuelConsumption } from './'

test('Day 07 — Sample', t => {
  const sample = `16,1,2,0,4,2,7,1,2,14`.split(',').map(Number)

  t.is(getFuelConsumption(sample), 37)
  t.is(getIncrementalFuelConsumption(sample), 168)
})

test('Day 07 — Solutions', t => {
  const input = $.readInput(import.meta, ',').map(Number)

  t.is(getFuelConsumption(input), 344138)
  t.is(getIncrementalFuelConsumption(input), 94862124)
})
