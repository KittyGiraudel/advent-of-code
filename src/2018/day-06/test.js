const test = require('ava')
const { mapOut } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`.split('\n')

test('Day 6.1', t => {
  t.is(mapOut(sample).largestRegionSize, 17)
})

test('Day 6.2', t => {
  t.is(mapOut(sample, 32).safeRegionSize, 16)
})

test('Day 6 — Solutions', t => {
  t.deepEqual(mapOut(input, 10000), {
    largestRegionSize: 5941,
    safeRegionSize: 40244,
  })
})
