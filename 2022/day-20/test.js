const test = require('ava')
const { mix } = require('./')
const $ = require('../../helpers')

test('Day 20 — Sample', t => {
  const sample = [1, 2, -3, 3, -2, 0, 4]

  t.is(mix(sample, 1, 1), 3)
  t.is(mix(sample, 10, 811589153), 1623178306)
})

test('Day 20 — Solutions', t => {
  const input = $.readInput(__dirname).map(Number)

  t.is(mix(input), 13522)
  t.is(mix(input, 10, 811589153), 17113168880158)
})
