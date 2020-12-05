const test = require('ava')
const { getCoords, getSeatId, getSeat } = require('./')
const readInput = require('../helpers/readInput')
const input = readInput('./src/day-5/input.txt')

test('Day 5.1', t => {
  t.deepEqual(getCoords('FBFBBFFRLR'), [44, 5])
  t.is(getSeatId('FBFBBFFRLR'), 357)
  t.deepEqual(getCoords('BFFFBBFRRR'), [70, 7])
  t.is(getSeatId('BFFFBBFRRR'), 567)
  t.deepEqual(getCoords('FFFBBBFRRR'), [14, 7])
  t.is(getSeatId('FFFBBBFRRR'), 119)
  t.deepEqual(getCoords('BBFFBBFRLL'), [102, 4])
  t.is(getSeatId('BBFFBBFRLL'), 820)
})

test('Day 5 — Solutions', t => {
  t.is(Math.max(...input.map(getSeatId)), 855)
  t.is(getSeat(input), 552)
})
