const test = require('ava')
const { getFuelConsumption, getIncrementalFuelConsumption } = require('./')
const input = require('../../helpers/readInput')(__dirname, ',').map(Number)

const sample = `16,1,2,0,4,2,7,1,2,14`.split(',').map(Number)

test('Day 7.1', t => {
  t.is(getFuelConsumption(sample), 37)
})

test('Day 7.2', t => {
  t.is(getIncrementalFuelConsumption(sample), 168)
})

test('Day 7 — Solutions', t => {
  t.is(getFuelConsumption(input), 344138)
  t.is(getIncrementalFuelConsumption(input), 94862124)
})
