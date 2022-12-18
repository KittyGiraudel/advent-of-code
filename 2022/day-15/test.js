const test = require('ava')
const { detect } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sample = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`.split('\n')

test('Day 15 — Sample', t => {
  t.is(detect(sample, 10), 26)
  t.is(detect(sample, null, 20), 56000011)
})

test('Day 15 — Solutions', t => {
  t.is(detect(input, 2_000_000), 5127797)
  t.is(detect(input, null, 4_000_000), 12518502636475)
})