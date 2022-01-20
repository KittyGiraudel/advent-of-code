const test = require('ava')
const { checksum } = require('./')
const input = require('../../helpers/readInput')(__dirname)

const sampleA = `5 1 9 5
7 5 3
2 4 6 8`.split('\n')

const sampleB = `5 9 2 8
9 4 7 3
3 8 6 5`.split('\n')

test('Day 2.1', t => {
  t.is(checksum(sampleA), 18)
})

test('Day 2.2', t => {
  t.is(checksum(sampleB, true), 9)
})

test('Day 2 — Solutions', t => {
  t.is(checksum(input), 46402)
  t.is(checksum(input, true), 265)
})
