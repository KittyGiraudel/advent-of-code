const test = require('ava')
const { getSurfaceArea } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`.split('\n')

test('Day 18 — Sample', t => {
  t.is(getSurfaceArea(sample), 64)
  t.is(getSurfaceArea(sample, true), 58)
})

test('Day 18 — Solutions', t => {
  t.is(getSurfaceArea(input), 3412)
  t.is(getSurfaceArea(input, true), 2018)
})
