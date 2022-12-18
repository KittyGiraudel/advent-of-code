const test = require('ava')
const { countOverlappingInches, detect } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sampleA = `#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`.split('\n')

test('Day 03 — Sample', t => {
  t.is(countOverlappingInches(sampleA), 4)
})

test('Day 03 — Solutions', t => {
  t.is(countOverlappingInches(input), 114946)
  t.is(detect(input), 877)
})
