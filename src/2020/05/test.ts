import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { findOwnSeat, getSeatCoords, getSeatId } from './'

test('Day 05 — Sample', () => {
  assert.deepStrictEqual(getSeatCoords('FBFBBFFRLR'), [44, 5])
  assert.strictEqual(getSeatId('FBFBBFFRLR'), 357)
  assert.deepStrictEqual(getSeatCoords('BFFFBBFRRR'), [70, 7])
  assert.strictEqual(getSeatId('BFFFBBFRRR'), 567)
  assert.deepStrictEqual(getSeatCoords('FFFBBBFRRR'), [14, 7])
  assert.strictEqual(getSeatId('FFFBBBFRRR'), 119)
  assert.deepStrictEqual(getSeatCoords('BBFFBBFRLL'), [102, 4])
  assert.strictEqual(getSeatId('BBFFBBFRLL'), 820)
})

test('Day 05 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(Math.max(...input.map(getSeatId)), 855)
  assert.strictEqual(findOwnSeat(input), 552)
})
