const test = require('ava')
const $ = require('../../helpers')
const { mapOut } = require('./')

test('Day 06 — Sample', t => {
  const sample = $.sample(`
  1, 1
  1, 6
  8, 3
  3, 4
  5, 5
  8, 9
  `)

  t.is(mapOut(sample).largestRegionSize, 17)
  t.is(mapOut(sample, 32).safeRegionSize, 16)
})

test('Day 06 — Solutions', t => {
  const input = $.readInput(__dirname)

  t.deepEqual(mapOut(input, 10000), {
    largestRegionSize: 5941,
    safeRegionSize: 40244,
  })
})
