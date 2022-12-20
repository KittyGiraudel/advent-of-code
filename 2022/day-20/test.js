const test = require('ava')
const { mix, hardMix } = require('./')
const input = require('../../helpers/readInput')(__dirname).map(Number)

const sample = [1, 2, -3, 3, -2, 0, 4]

test('Day 20 — Sample', t => {
  t.is(mix(sample, 1, 1), 3)
  t.is(mix(sample, 10, 811589153), 1623178306)
})

test('Day 20 — Solutions', t => {
  t.is(mix(input), 13522)
  t.is(mix(input, 10, 811589153), 17113168880158)
})
