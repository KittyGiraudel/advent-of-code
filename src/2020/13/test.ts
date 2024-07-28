import assert from 'node:assert'
import test from 'node:test'
import { getEarliestTimestamp, getNextDeparture } from '.'
import $ from '../../helpers'

test('Day 13 — Sample', () => {
  assert.strictEqual(
    $.product(
      getNextDeparture(
        '939\n7,13,x,x,59,x,31,19'.split('\n') as [string, string]
      )
    ),
    295
  )
  assert.strictEqual(getEarliestTimestamp('\n7,13'.split('\n')), 77)
  assert.strictEqual(getEarliestTimestamp('\n7,13,x'.split('\n')), 77)
  assert.strictEqual(getEarliestTimestamp('\n7,13,x,x,59'.split('\n')), 350)
  assert.strictEqual(
    getEarliestTimestamp('\n7,13,x,x,59,x,31,19'.split('\n')),
    1_068_781
  )
  assert.strictEqual(getEarliestTimestamp('\n17,x,13,19'.split('\n')), 3417)
  assert.strictEqual(getEarliestTimestamp('\n67,7,59,61'.split('\n')), 754_018)
  assert.strictEqual(
    getEarliestTimestamp('\n67,x,7,59,61'.split('\n')),
    779_210
  )
  assert.strictEqual(
    getEarliestTimestamp('\n67,7,x,59,61'.split('\n')),
    1_261_476
  )
  assert.strictEqual(
    getEarliestTimestamp('\n1789,37,47,1889'.split('\n')),
    1_202_161_486
  )
})

test('Day 13 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(
    $.product(getNextDeparture(input as [string, string])),
    5257
  )
  assert.strictEqual(getEarliestTimestamp(input), 538_703_333_547_789)
})
